<?php

declare(strict_types=1);

/**
 * Contact form endpoint.
 *
 * Receives the form as JSON, validates it and forwards it by mail (SMTP) and to a Discord
 * webhook. Both channels are independent: the request only fails if BOTH of them fail.
 * Nothing is stored, only a rate-limit counter per hashed IP (see rate_dir in the config).
 */

use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const MIN_MESSAGE = 10;
const MAX_BODY_BYTES = 20000;
/** Bots submit instantly, so a faster submit than this is treated as spam. */
const MIN_FILL_MS = 3000;
const RATE_LIMIT = 3;
const RATE_WINDOW_SECONDS = 600;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

main();

/**
 * Handles the request from start to finish.
 */
function main(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        respond(405, false, 'method_not_allowed');
    }

    $config = loadConfig();
    if ($config === null) {
        logError('config missing or invalid');
        respond(500, false, 'server_error');
    }

    $input = readJsonBody();
    if ($input === null) {
        respond(400, false, 'invalid_request');
    }

    // Honeypot or too fast: pretend success so bots learn nothing.
    $honeypot = $input['website'] ?? '';
    if (!is_string($honeypot) || trim($honeypot) !== '' || (int) ($input['elapsedMs'] ?? 0) < MIN_FILL_MS) {
        respond(200, true);
    }

    $data = validate($input);
    if ($data === null) {
        respond(422, false, 'validation_failed');
    }

    if (!allowedByRateLimit((string) ($_SERVER['REMOTE_ADDR'] ?? ''), $config)) {
        respond(429, false, 'too_many_requests');
    }

    // No short-circuit: both channels must always be tried.
    $mailSent = sendMail($data, $config);
    $discordSent = sendDiscord($data, $config);

    if ($mailSent || $discordSent) {
        respond(200, true);
    }
    respond(502, false, 'delivery_failed');
}

/**
 * Sends the JSON answer and ends the script.
 *
 * @param int         $status HTTP status code.
 * @param bool        $ok     Whether the message was delivered.
 * @param string|null $error  Machine readable reason on failure.
 */
function respond(int $status, bool $ok, ?string $error = null): never
{
    http_response_code($status);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

/**
 * Loads the secrets. They live OUTSIDE the deployed folder so `rsync --delete` never touches them
 * and they are never reachable from the web: one level above the web root on the server,
 * the repo root locally. CONTACT_CONFIG can override the path.
 *
 * @return array<string, mixed>|null The config, or null if missing or invalid.
 */
function loadConfig(): ?array
{
    $override = getenv('CONTACT_CONFIG');
    $path = $override !== false && $override !== '' ? $override : dirname(__DIR__, 2) . '/contact-config.php';
    if (!is_file($path)) {
        return null;
    }
    $config = require $path;
    return is_array($config) ? $config : null;
}

/**
 * Reads and decodes the JSON body.
 *
 * @return array<string, mixed>|null The decoded object, or null if it is not a JSON object.
 */
function readJsonBody(): ?array
{
    $raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
    if ($raw === false || $raw === '' || strlen($raw) > MAX_BODY_BYTES) {
        return null;
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : null;
}

/**
 * Validates and normalises the fields (the same rules as the form, enforced again on the server).
 *
 * @param array<string, mixed> $input Decoded request body.
 * @return array{name: string, email: string, message: string}|null Clean data, or null if invalid.
 */
function validate(array $input): ?array
{
    foreach (['name', 'email', 'message'] as $field) {
        if (!isset($input[$field]) || !is_string($input[$field])) {
            return null;
        }
    }
    if (($input['privacy'] ?? false) !== true) {
        return null;
    }

    // Line breaks in name/email would allow mail header injection.
    $name = trim((string) preg_replace('/[\p{Cc}\p{Cf}]+/u', ' ', $input['name']));
    $email = trim($input['email']);
    // Keep the line breaks of the message, drop other control characters.
    $message = trim((string) preg_replace('/[^\P{Cc}\n]/u', '', str_replace(["\r\n", "\r"], "\n", $input['message'])));

    if ($name === '' || mb_strlen($name) > MAX_NAME) {
        return null;
    }
    if (mb_strlen($email) > MAX_EMAIL || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        return null;
    }
    if (mb_strlen($message) < MIN_MESSAGE || mb_strlen($message) > MAX_MESSAGE) {
        return null;
    }

    return ['name' => $name, 'email' => $email, 'message' => $message];
}

/**
 * Counts this request against the IP's limit. Only a hash of the IP and a few timestamps are
 * stored, no message and no plain IP. Old counters are removed.
 *
 * @param string               $ip     Remote address.
 * @param array<string, mixed> $config Config with `rate_dir`.
 * @return bool True if the request may proceed.
 */
function allowedByRateLimit(string $ip, array $config): bool
{
    $dir = (string) ($config['rate_dir'] ?? '');
    if ($dir === '') {
        return true;
    }
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
        logError('rate_dir not writable');
        return true; // do not block real users because of a server problem
    }

    $now = time();
    foreach (glob($dir . '/*.json') ?: [] as $file) {
        if ($now - (int) filemtime($file) > RATE_WINDOW_SECONDS) {
            @unlink($file);
        }
    }

    $file = $dir . '/' . hash('sha256', $ip . '|' . ($config['rate_salt'] ?? '')) . '.json';
    $handle = fopen($file, 'c+');
    if ($handle === false) {
        return true;
    }
    flock($handle, LOCK_EX);
    $stored = json_decode((string) stream_get_contents($handle), true);
    $recent = array_values(array_filter(
        is_array($stored) ? $stored : [],
        static fn ($time): bool => is_int($time) && $now - $time < RATE_WINDOW_SECONDS,
    ));

    $allowed = count($recent) < RATE_LIMIT;
    if ($allowed) {
        $recent[] = $now;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string) json_encode($recent));
    flock($handle, LOCK_UN);
    fclose($handle);

    return $allowed;
}

/**
 * Sends the message by mail. In `dev_mode` nothing is sent, the mail is only written to the log.
 *
 * @param array{name: string, email: string, message: string} $data   Clean form data.
 * @param array<string, mixed>                                $config Mail settings.
 * @return bool True on success.
 */
function sendMail(array $data, array $config): bool
{
    $subject = 'Anfrage aus Portfolio von ' . $data['name'];
    $body = $data['message'] . "\n\n--\nName: " . $data['name'] . "\nE-Mail: " . $data['email'];

    if (($config['dev_mode'] ?? false) === true) {
        error_log("[contact dev] mail skipped: {$subject}\n{$body}");
        return true;
    }

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = (string) $config['smtp_host'];
        $mail->Port = (int) ($config['smtp_port'] ?? 587);
        $mail->SMTPAuth = true;
        $mail->Username = (string) $config['smtp_user'];
        $mail->Password = (string) $config['smtp_pass'];
        $mail->SMTPSecure = ($config['smtp_secure'] ?? 'tls') === 'ssl'
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Timeout = 10;
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->isHTML(false);

        $mail->setFrom((string) $config['mail_from'], 'Portfolio');
        $mail->addAddress((string) $config['mail_to']);
        $mail->addReplyTo($data['email'], $data['name']);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->send();
        return true;
    } catch (\Throwable $e) {
        // Only the technical reason, never the visitor's data.
        logError('mail failed: ' . $e->getMessage());
        return false;
    }
}

/**
 * Posts the message to the Discord webhook. In `dev_mode` without a webhook it is skipped.
 *
 * @param array{name: string, email: string, message: string} $data   Clean form data.
 * @param array<string, mixed>                                $config Needs `discord_webhook`.
 * @return bool True on success.
 */
function sendDiscord(array $data, array $config): bool
{
    $webhook = (string) ($config['discord_webhook'] ?? '');
    if ($webhook === '') {
        if (($config['dev_mode'] ?? false) === true) {
            error_log('[contact dev] discord skipped (no webhook set)');
        }
        return ($config['dev_mode'] ?? false) === true;
    }

    $payload = json_encode([
        'content' => '@everyone',
        // Only this ping is allowed: names/messages from visitors can never mention roles or users.
        'allowed_mentions' => ['parse' => ['everyone']],
        'embeds' => [[
            'title' => 'Anfrage aus Portfolio',
            'description' => $data['message'],
            'color' => 0x1B7FEC,
            'fields' => [
                ['name' => 'Name', 'value' => $data['name'], 'inline' => true],
                ['name' => 'E-Mail', 'value' => $data['email'], 'inline' => true],
            ],
        ]],
    ], JSON_UNESCAPED_UNICODE);

    $curl = curl_init($webhook);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
    ]);
    curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $error = curl_error($curl);
    curl_close($curl);

    if ($status < 200 || $status >= 300) {
        logError('discord failed: HTTP ' . $status . ($error !== '' ? ' ' . $error : ''));
        return false;
    }
    return true;
}

/**
 * Writes a technical error to the PHP error log (never any visitor data).
 *
 * @param string $reason What went wrong.
 */
function logError(string $reason): void
{
    error_log('[contact] ' . $reason);
}
