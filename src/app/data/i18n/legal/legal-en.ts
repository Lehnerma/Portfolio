import { LegalTranslations } from '../../../interfaces/legal-translations';

/*
 * TODO: Replace every value in [square brackets] with real details
 * and have the texts legally reviewed before the site goes live.
 */
export const LEGAL_EN: LegalTranslations = {
  common: {
    backToHome: 'Back to home',
  },
  imprint: {
    title: 'Imprint',
    intro:
      'Information pursuant to Section 5 of the Austrian E-Commerce Act (ECG) and Section 25 of the Media Act.',
    sections: [
      {
        heading: 'Owner and operator',
        paragraphs: [
          'Maximilian Lehner',
          '[Street and house number]',
          '[Postcode] Grafenegg, Austria',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['Email: info@max-lehner.at', 'Phone: [phone number]'],
      },
      {
        heading: 'Business purpose',
        paragraphs: ['[e.g. software development / web development]'],
      },
      {
        heading: 'VAT identification number',
        paragraphs: ['[VAT ID, if applicable]'],
      },
      {
        heading: 'Applicable legislation',
        paragraphs: ['[Trade Regulation Act: www.ris.bka.gv.at]'],
      },
      {
        heading: 'Basic orientation of this website',
        paragraphs: ['Personal presentation of projects and skills (portfolio).'],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro:
      'Protecting your personal data matters to me. Here you can see which data is processed when you visit this website.',
    sections: [
      {
        heading: 'Controller',
        paragraphs: ['Maximilian Lehner, [address], info@max-lehner.at'],
      },
      {
        heading: 'Hosting and server log files',
        paragraphs: [
          'This website is hosted by [hosting provider]. When you visit it, technically necessary data (e.g. IP address, date and time, requested page, browser type) is processed in server log files.',
          'The legal basis is Art. 6(1)(f) GDPR (legitimate interest in secure and stable operation). [Add retention period]',
        ],
      },
      {
        heading: 'Contact form',
        paragraphs: [
          'If you write to me via the contact form, I process your name, email address and message to answer your request. [Add mail service / backend]',
          'The legal basis is your consent (Art. 6(1)(a) GDPR) or the initiation of a collaboration (Art. 6(1)(b) GDPR). The data is deleted once your request is handled and no statutory retention duties apply.',
        ],
      },
      {
        heading: 'Local storage',
        paragraphs: [
          'Your language choice is saved in your browser’s local storage (localStorage) so it is kept for your next visit. This information never leaves your device.',
        ],
      },
      {
        heading: 'External content',
        paragraphs: [
          '[List fonts, analytics or map services, or write “No external services are embedded”]',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right to access, rectification, erasure, restriction of processing, data portability and objection. You can withdraw any consent you have given at any time.',
          'If you have a complaint, you can contact the Austrian Data Protection Authority: www.dsb.gv.at.',
        ],
      },
    ],
  },
  legalNotice: {
    title: 'Legal Notice',
    sections: [
      {
        heading: 'Liability for content',
        paragraphs: [
          'The content of this website was created with the greatest possible care. However, no guarantee can be given for its accuracy, completeness or timeliness.',
        ],
      },
      {
        heading: 'Liability for links',
        paragraphs: [
          'This website contains links to external websites. I have no influence on their content and accept no liability for it. The operators of the linked pages are solely responsible for their content.',
        ],
      },
      {
        heading: 'Copyright',
        paragraphs: [
          'The content and works on this website are subject to copyright. Reproduction, editing and distribution beyond the limits of copyright law require my written consent. [Add image credits / licences]',
        ],
      },
    ],
  },
};
