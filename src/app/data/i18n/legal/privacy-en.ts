import { LegalPageTexts } from '../../../interfaces/legal-translations';

/** English version of `privacy-de.ts`. The German version is legally binding. */
export const PRIVACY_EN: LegalPageTexts = {
  title: 'Privacy Policy',
  intro:
    'Protecting your personal data matters to me. I process it solely on the basis of the applicable law (GDPR, Austrian Data Protection Act – DSG, Austrian Telecommunications Act 2021 – TKG 2021). Last updated: November 2026.',
  sections: [
    {
      heading: 'Controller',
      paragraphs: ['Maximilian Lehner', '3492 Etsdorf, Austria', 'Email: info@max-lehner.at'],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'This website is hosted by ALL-INKL.COM – Neue Medien Münnich, owner René Münnich, Hauptstraße 68, 02742 Friedersdorf, Germany. A data processing agreement pursuant to Art. 28 GDPR is in place with the host. The data is processed on servers in Germany.',
      ],
    },
    {
      heading: 'Server log files',
      paragraphs: [
        'When you visit this website, technically necessary data is automatically recorded in server log files:',
      ],
      items: [
        'IP address',
        'Date and time of access',
        'Requested page or file',
        'Referrer URL (previously visited page)',
        'Browser type, browser version and operating system',
      ],
    },
    {
      heading: 'Purpose and legal basis of the log files',
      paragraphs: [
        'This processing serves to deliver the website and to keep it secure and stable. The legal basis is my legitimate interest pursuant to Art. 6(1)(f) GDPR. The log files are stored only as long as necessary for these purposes and are then deleted or anonymised.',
      ],
    },
    {
      heading: 'Contact by email or contact form',
      paragraphs: [
        'If you send me an email or use the contact form, I process your name, email address and message in order to answer your request.',
        'When you submit the form, this data is forwarded to me by email through a PHP script on my web server (All-Inkl).',
      ],
    },
    {
      heading: 'Storage and abuse protection',
      paragraphs: [
        'Messages are not stored on my server. To protect against abuse, a counter per anonymised (hashed) IP address is kept for a short time (10 minutes at most) and then discarded.',
        'The legal basis is Art. 6(1)(b) GDPR where the request concerns a job application or collaboration, otherwise my legitimate interest in answering requests and in preventing abuse (Art. 6(1)(f) GDPR). Your data is deleted once the request has been dealt with, unless statutory retention obligations apply.',
      ],
    },
    {
      heading: 'Cookies and local storage',
      paragraphs: [
        'This website uses no cookies and no analytics or tracking services.',
        'Your language choice is saved in your browser’s local storage (localStorage) so that it is kept for your next visit. This information never leaves your device. The storage is strictly necessary for the service you requested (§ 165(3) TKG 2021) and therefore requires no consent. You can delete it at any time in your browser settings.',
      ],
    },
    {
      heading: 'Fonts',
      paragraphs: [
        'All fonts are hosted locally on the server. No connection to external providers such as Google Fonts is made when the website loads.',
      ],
    },
    {
      heading: 'External links',
      paragraphs: [
        'This website links to external services such as GitHub, LinkedIn and my project demos. Data is only transferred to these providers once you click a link. Their own privacy policies apply to any processing there.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: ['In principle, you have the following rights:'],
      items: [
        'Access (Art. 15 GDPR)',
        'Rectification (Art. 16 GDPR)',
        'Erasure (Art. 17 GDPR)',
        'Restriction of processing (Art. 18 GDPR)',
        'Data portability (Art. 20 GDPR)',
        'Objection to processing (Art. 21 GDPR)',
      ],
    },
    {
      heading: 'Right to lodge a complaint',
      paragraphs: [
        'If you believe that the processing of your data violates data protection law, you can lodge a complaint with the supervisory authority. In Austria this is the Data Protection Authority (Datenschutzbehörde), Barichgasse 40–42, 1030 Vienna, www.dsb.gv.at.',
      ],
    },
    {
      heading: 'Automated decision-making',
      paragraphs: [
        'No automated decision-making, including profiling, within the meaning of Art. 22 GDPR takes place.',
      ],
    },
  ],
};
