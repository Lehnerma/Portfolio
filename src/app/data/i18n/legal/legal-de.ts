import { LegalTranslations } from '../../../interfaces/legal-translations';

/*
 * TODO: Alle Werte in [eckigen Klammern] durch echte Angaben ersetzen
 * und die Texte rechtlich prüfen lassen, bevor die Seite online geht.
 */
export const LEGAL_DE: LegalTranslations = {
  common: {
    backToHome: 'Zurück zur Startseite',
  },
  imprint: {
    title: 'Impressum',
    intro: 'Angaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz.',
    sections: [
      {
        heading: 'Medieninhaber und Betreiber',
        paragraphs: ['Maximilian Lehner', '[Straße und Hausnummer]', '[PLZ] Grafenegg, Österreich'],
      },
      {
        heading: 'Kontakt',
        paragraphs: ['E-Mail: info@max-lehner.at', 'Telefon: [Telefonnummer]'],
      },
      {
        heading: 'Unternehmensgegenstand',
        paragraphs: ['[z. B. Softwareentwicklung / Webentwicklung]'],
      },
      {
        heading: 'Umsatzsteuer-Identifikationsnummer',
        paragraphs: ['[UID-Nummer, falls vorhanden]'],
      },
      {
        heading: 'Anwendbare Rechtsvorschriften',
        paragraphs: ['[Gewerbeordnung: www.ris.bka.gv.at]'],
      },
      {
        heading: 'Grundlegende Richtung der Website',
        paragraphs: ['Persönliche Präsentation von Projekten und Fähigkeiten (Portfolio).'],
      },
    ],
  },
  privacy: {
    title: 'Datenschutzerklärung',
    intro:
      'Der Schutz deiner persönlichen Daten ist mir wichtig. Hier erfährst du, welche Daten beim Besuch dieser Website verarbeitet werden.',
    sections: [
      {
        heading: 'Verantwortlicher',
        paragraphs: ['Maximilian Lehner, [Adresse], info@max-lehner.at'],
      },
      {
        heading: 'Hosting und Server-Logfiles',
        paragraphs: [
          'Diese Website wird bei [Hosting-Anbieter] gehostet. Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp) in Server-Logfiles verarbeitet.',
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb). [Speicherdauer ergänzen]',
        ],
      },
      {
        heading: 'Kontaktformular',
        paragraphs: [
          'Wenn du mir über das Kontaktformular schreibst, verarbeite ich Name, E-Mail-Adresse und Nachricht, um deine Anfrage zu beantworten. [Versanddienst / Backend ergänzen]',
          'Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. die Anbahnung einer Zusammenarbeit (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden gelöscht, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten bestehen.',
        ],
      },
      {
        heading: 'Lokale Speicherung',
        paragraphs: [
          'Deine Sprachauswahl wird im lokalen Speicher deines Browsers (localStorage) abgelegt, damit sie beim nächsten Besuch erhalten bleibt. Diese Information verlässt dein Gerät nicht.',
        ],
      },
      {
        heading: 'Externe Inhalte',
        paragraphs: [
          '[Schriftarten, Analyse- oder Karten-Dienste auflisten oder „Es werden keine externen Dienste eingebunden“ eintragen]',
        ],
      },
      {
        heading: 'Deine Rechte',
        paragraphs: [
          'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Erteilte Einwilligungen kannst du jederzeit widerrufen.',
          'Bei Beschwerden kannst du dich an die österreichische Datenschutzbehörde wenden: www.dsb.gv.at.',
        ],
      },
    ],
  },
  legalNotice: {
    title: 'Rechtliche Hinweise',
    sections: [
      {
        heading: 'Haftung für Inhalte',
        paragraphs: [
          'Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden.',
        ],
      },
      {
        heading: 'Haftung für Links',
        paragraphs: [
          'Diese Website enthält Links zu externen Websites. Auf deren Inhalte habe ich keinen Einfluss und übernehme dafür keine Gewähr. Für die Inhalte verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.',
        ],
      },
      {
        heading: 'Urheberrecht',
        paragraphs: [
          'Die Inhalte und Werke auf dieser Website unterliegen dem Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung. [Bildquellen / Lizenzen ergänzen]',
        ],
      },
    ],
  },
};
