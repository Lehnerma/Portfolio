# Kontaktformular – Server & lokales Testen

Endpoint: `public/api/contact.php` (wird mit dem Build nach `<DEPLOY_PATH>/api/` deployed).
Secrets liegen **nicht** im Repo: `contact-config.php` (Vorlage: `contact-config.example.php`).

## Einmalig auf dem Server (All-Inkl)

1. Postfach `kontakt@max-lehner.at` in KAS anlegen, Passwort notieren.
2. Discord-Kanal → Einstellungen → Integrationen → Webhooks → URL kopieren.
3. `contact-config.example.php` kopieren nach `/www/htdocs/w01d73e3/contact-config.php`
   (eine Ebene **über** dem Webroot `/www/htdocs/w01d73e3/max-lehner.at`), Werte eintragen,
   `rate_salt` auf einen zufälligen String setzen, `dev_mode` auf `false`.
4. SMTP-Host/Port aus KAS (E-Mail → Postfach → Server-Daten) übernehmen.
   Der Ordner `contact-rate/` wird beim ersten Request automatisch angelegt.

## Lokal testen

```bash
brew install php
cp server/contact-config.example.php contact-config.php   # Repo-Root, ist git-ignoriert
# in contact-config.php: 'dev_mode' => true  (Mail wird nur ins Log geschrieben)
#   'rate_dir' => __DIR__ . '/contact-rate'
php -S localhost:8080 -t public      # Terminal 1
npm start                            # Terminal 2, /api wird per proxy.conf.json an :8080 geleitet
```

Discord wird lokal übersprungen, solange `discord_webhook` leer ist.

## curl-Szenarien

```bash
URL=http://localhost:8080/api/contact.php   # oder https://max-lehner.at/api/contact.php
H='Content-Type: application/json'
OK='{"name":"Max","email":"max@example.com","message":"Hallo, das ist ein Test.","privacy":true,"website":"","elapsedMs":5000}'

curl -i -X POST -H "$H" -d "$OK" $URL                                     # 200 {"ok":true}
curl -i $URL                                                              # 405
curl -i -X POST -H "$H" -d '{"name":"Max"}' $URL                          # 422
curl -i -X POST -H "$H" -d "${OK/\"website\":\"\"/\"website\":\"x\"}" $URL  # 200, aber nichts gesendet (Honeypot)
curl -i -X POST -H "$H" -d "${OK/5000/100}" $URL                          # 200, aber nichts gesendet (zu schnell)
curl -i -X POST -H "$H" -d "${OK/max@example.com/max@x.com\\r\\nBcc:a@b.c}" $URL  # 422 (Header-Injection)
for i in 1 2 3 4; do curl -s -o /dev/null -w "%{http_code}\n" -X POST -H "$H" -d "$OK" $URL; done  # 200 200 200 429
```
