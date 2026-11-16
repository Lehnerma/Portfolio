import { ContactFormValue } from './contact-form-value';

/** What `api/contact.php` receives: the form plus the two spam-protection fields. */
export interface ContactRequest extends ContactFormValue {
  /** Honeypot: hidden for humans, so it must stay empty. */
  website: string;
  /** How long the visitor needed to fill in the form; bots are much faster. */
  elapsedMs: number;
}

export type ContactResult = 'success' | 'rate-limited' | 'error';
