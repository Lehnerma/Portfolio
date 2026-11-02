# TODO: Rechtliche Seiten

## 1. LanguageService erweitern (blockiert den Build!)

Datei: `src/app/services/language-service.ts`

- [ ] Import ergänzen: `import { LEGAL_TRANSLATIONS } from '../data/i18n/legal/legal-translations';`
- [ ] Neues Signal neben `texts` anlegen:
  `readonly legalTexts = computed(() => LEGAL_TRANSLATIONS[this._language()]);`
- [ ] Doc-Kommentar dazu: "Legal page texts of the active language."
- [ ] Danach `npx tsc --noEmit -p tsconfig.app.json` laufen lassen. Die 3 Fehler zu `legalTexts` müssen weg sein.
- [ ] Optional: `language-service.spec.ts` um einen Test für `legalTexts` erweitern (DE/EN umschalten).

## 2. Links einbauen

- [ ] `src/app/data/nav.ts`: Footer-Eintrag `legalNotice` hat noch `link: ''`. Aktuell zeigt das Label "Impressum", also auf `/imprint` setzen (oder Label/Route neu zuordnen).
- [ ] Footer-Einträge für "Datenschutz" und "Legal Notice" ergänzen. Dafür neue Keys in `FooterTexts` (`interfaces/translations.ts`) sowie in `de.ts` und `en.ts`.
- [ ] `nav-element` nutzt `[href]`, was bei internen Links einen Full-Reload auslöst. Für `/imprint` usw. `routerLink` verwenden (z. B. zweiter Input oder Prüfung, ob der Link mit `/` beginnt).
- [ ] Contact-Form: Link "Datenschutzerklärung" (`form.privacy.linkText`) auf `/privacy-policy` setzen.
- [ ] Anchor-Links (`#about` usw.) funktionieren auf den Rechtsseiten nicht. Falls ein Header dort erscheinen soll, Links auf `/#about` umstellen und `anchorScrolling: 'enabled'` in `withInMemoryScrolling` (app.config.ts) aktivieren.

## 3. Inhalte füllen

- [ ] In `legal-de.ts` und `legal-en.ts` alle `[eckigen Klammern]` ersetzen: Adresse, Telefon, Unternehmensgegenstand, UID, Hosting-Anbieter, Speicherdauer, Versanddienst fürs Kontaktformular, externe Dienste (Schriftarten!), Bildquellen.
- [ ] Prüfen, ob "Rechtliche Hinweise" (Haftung/Urheberrecht) und "Impressum" wirklich getrennte Seiten bleiben sollen oder `legal-notice` nur die EN-Variante des Impressums sein soll. Dann Route und Komponente entfernen.
- [ ] Texte rechtlich gegenprüfen (Generator oder Beratung). Das sind Platzhalter, keine geprüften Rechtstexte.

## 4. Kontrolle

- [ ] Alle drei Routen manuell aufrufen: `/imprint`, `/privacy-policy`, `/legal-notice` (DE und EN umschalten).
- [ ] Beim Wechsel von Footer zu Rechtsseite landet man oben (Scroll-Restoration ist in `app.config.ts` aktiv).
- [ ] Tab-Titel der Routen sind noch statisch Englisch (`app.routes.ts`). Optional per `Title`-Service sprachabhängig machen.
- [ ] AXE/Kontrast prüfen (Seite ist hell mit dunklem Text). Evtl. `noindex` per Meta-Tag.
