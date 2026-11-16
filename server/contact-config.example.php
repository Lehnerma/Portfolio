<?php

/**
 * Template for the secrets of public/api/contact.php. NOT deployed.
 *
 * Copy it to the server as /www/htdocs/w01d73e3/contact-config.php (one level ABOVE the web root
 * /www/htdocs/w01d73e3/max-lehner.at, so `rsync --delete` never removes it and it is not reachable
 * from the web). Locally copy it to <repo>/contact-config.php (git-ignored) and set dev_mode.
 */

return [
    // Local only: true = mail is written to the PHP log instead of sent; Discord is skipped
    // while discord_webhook is empty.
    'dev_mode' => false,

    // SMTP of the sender mailbox (All-Inkl: see KAS -> E-Mail -> mailbox -> server data)
    'smtp_host' => 'w01d73e3.kasserver.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls', // 'tls' (port 587) or 'ssl' (port 465)
    'smtp_user' => 'kontakt@max-lehner.at',
    'smtp_pass' => '',

    'mail_from' => 'kontakt@max-lehner.at',
    'mail_to' => 'info@max-lehner.at',

    // Discord channel -> Settings -> Integrations -> Webhooks -> copy URL
    'discord_webhook' => '',

    // Rate limit counters (hashed IP only), also OUTSIDE the web root
    'rate_dir' => '/www/htdocs/w01d73e3/contact-rate',
    // Any random string, makes the IP hashes unguessable
    'rate_salt' => '',
];
