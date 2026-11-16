import { LegalPageTexts } from '../../../interfaces/legal-translations';

/**
 * Impressum / Offenlegung für eine kleine, nicht kommerzielle Website (§ 25 Abs. 5 MedienG).
 * Bei gewerblicher Tätigkeit zusätzlich § 5 ECG beachten (volle Anschrift, UID, Gewerbe).
 */
export const IMPRINT_DE: LegalPageTexts = {
  title: 'Impressum',
  intro: 'Offenlegung gemäß § 25 Mediengesetz (MedienG).',
  sections: [
    {
      heading: 'Medieninhaber',
      paragraphs: ['Maximilian Lehner', 'Wohnort: 3492 Etsdorf, Österreich'],
    },
    {
      heading: 'Kontakt',
      paragraphs: ['E-Mail: info@max-lehner.at'],
    },
    {
      heading: 'Grundlegende Richtung der Website',
      paragraphs: [
        'Persönliche Website zur Präsentation meiner Projekte und Fähigkeiten als Webentwickler, insbesondere im Rahmen von Bewerbungen. Es werden keine Waren oder Dienstleistungen angeboten.',
      ],
    },
    {
      heading: 'Haftung für Inhalte',
      paragraphs: [
        'Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden.',
      ],
    },
    {
      heading: 'Haftung für Links',
      paragraphs: [
        'Diese Website enthält Links zu externen Websites. Auf deren Inhalte habe ich keinen Einfluss und übernehme dafür keine Gewähr. Für die Inhalte verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich. Sollten mir Rechtsverletzungen bekannt werden, entferne ich die betreffenden Links umgehend.',
      ],
    },
    {
      heading: 'Urheberrecht',
      paragraphs: [
        'Die Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung.',
      ],
    },
  ],
};
