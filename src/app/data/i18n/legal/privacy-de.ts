import { LegalPageTexts } from '../../../interfaces/legal-translations';

/** Datenschutzerklärung nach DSGVO, DSG und TKG 2021. Bei neuen Diensten (Analyse, Fonts, Backend) ergänzen. */
export const PRIVACY_DE: LegalPageTexts = {
  title: 'Datenschutzerklärung',
  intro:
    'Der Schutz deiner persönlichen Daten ist mir wichtig. Ich verarbeite sie ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, Datenschutzgesetz – DSG, Telekommunikationsgesetz 2021 – TKG 2021). Stand: November 2026.',
  sections: [
    {
      heading: 'Verantwortlicher',
      paragraphs: ['Maximilian Lehner', '3492 Etsdorf, Österreich', 'E-Mail: info@max-lehner.at'],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'Diese Website wird bei ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf, Deutschland, gehostet. Mit dem Hoster besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Die Daten werden auf Servern in Deutschland verarbeitet.',
      ],
    },
    {
      heading: 'Server-Logfiles',
      paragraphs: [
        'Beim Aufruf dieser Website werden automatisch technisch notwendige Daten in Server-Logfiles erfasst:',
      ],
      items: [
        'IP-Adresse',
        'Datum und Uhrzeit des Zugriffs',
        'aufgerufene Seite bzw. Datei',
        'Referrer-URL (zuvor besuchte Seite)',
        'Browsertyp, Browserversion und Betriebssystem',
      ],
    },
    {
      heading: 'Zweck und Rechtsgrundlage der Logfiles',
      paragraphs: [
        'Die Verarbeitung dient der Auslieferung der Website sowie ihrer Sicherheit und Stabilität. Rechtsgrundlage ist mein berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Die Logfiles werden nur so lange gespeichert, wie es für diese Zwecke erforderlich ist, und anschließend gelöscht oder anonymisiert.',
      ],
    },
    {
      heading: 'Kontaktaufnahme per E-Mail oder Kontaktformular',
      paragraphs: [
        'Wenn du mir eine E-Mail schreibst oder das Kontaktformular nutzt, verarbeite ich deinen Namen, deine E-Mail-Adresse und deine Nachricht, um deine Anfrage zu beantworten.',
        'Beim Absenden des Formulars werden diese Daten über ein PHP-Skript auf meinem Webserver (All-Inkl) weitergeleitet:',
      ],
      items: [
        'per E-Mail an mich',
        'zusätzlich über einen Webhook als Benachrichtigung an einen privaten Kanal bei Discord (Discord Inc., 444 De Haro Street, Suite 200, San Francisco, CA 94107, USA). Dabei kann eine Übermittlung in die USA stattfinden.',
      ],
    },
    {
      heading: 'Speicherung und Schutz vor Missbrauch',
      paragraphs: [
        'Auf meinem Server werden Nachrichten nicht gespeichert. Zum Schutz vor Missbrauch wird kurzzeitig (maximal 10 Minuten) ein Zähler pro anonymisierter (gehashter) IP-Adresse geführt und danach verworfen.',
        'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern die Anfrage eine Bewerbung oder Zusammenarbeit betrifft, ansonsten mein berechtigtes Interesse an der Beantwortung von Anfragen und am Schutz vor Missbrauch (Art. 6 Abs. 1 lit. f DSGVO). Deine Daten werden gelöscht, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      ],
    },
    {
      heading: 'Cookies und lokale Speicherung',
      paragraphs: [
        'Diese Website verwendet keine Cookies und keine Analyse- oder Tracking-Dienste.',
        'Deine Sprachauswahl wird im lokalen Speicher deines Browsers (localStorage) abgelegt, damit sie beim nächsten Besuch erhalten bleibt. Diese Information verlässt dein Gerät nicht. Die Speicherung ist für den von dir gewünschten Dienst unbedingt erforderlich (§ 165 Abs. 3 TKG 2021) und benötigt daher keine Einwilligung. Du kannst sie jederzeit über die Einstellungen deines Browsers löschen.',
      ],
    },
    {
      heading: 'Schriftarten',
      paragraphs: [
        'Alle Schriftarten sind lokal auf dem Server eingebunden. Beim Laden der Website wird keine Verbindung zu externen Anbietern wie Google Fonts aufgebaut.',
      ],
    },
    {
      heading: 'Externe Links',
      paragraphs: [
        'Diese Website verlinkt auf externe Angebote, etwa GitHub, LinkedIn und meine Projekt-Demos. Daten werden an diese Anbieter erst übermittelt, wenn du einen Link anklickst. Für die Verarbeitung dort gelten die Datenschutzerklärungen der jeweiligen Anbieter.',
      ],
    },
    {
      heading: 'Deine Rechte',
      paragraphs: ['Dir stehen grundsätzlich folgende Rechte zu:'],
      items: [
        'Auskunft (Art. 15 DSGVO)',
        'Berichtigung (Art. 16 DSGVO)',
        'Löschung (Art. 17 DSGVO)',
        'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
        'Datenübertragbarkeit (Art. 20 DSGVO)',
        'Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
      ],
    },
    {
      heading: 'Beschwerderecht',
      paragraphs: [
        'Wenn du glaubst, dass die Verarbeitung deiner Daten gegen das Datenschutzrecht verstößt, kannst du dich bei der Aufsichtsbehörde beschweren. In Österreich ist das die Datenschutzbehörde, Barichgasse 40–42, 1030 Wien, www.dsb.gv.at.',
      ],
    },
    {
      heading: 'Automatisierte Entscheidungen',
      paragraphs: [
        'Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 DSGVO statt.',
      ],
    },
  ],
};
