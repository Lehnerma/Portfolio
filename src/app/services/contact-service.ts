import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ContactRequest, ContactResult } from '../interfaces/contact-request';

const ENDPOINT = '/api/contact.php';
const TOO_MANY_REQUESTS = 429;

/** Sends the contact form to `api/contact.php`, which forwards it by mail and to Discord. */
@Service()
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly _sending = signal(false);

  /** True while a request is on its way, so the form can block double submits. */
  readonly sending = this._sending.asReadonly();

  /**
   * Sends the message.
   * @param request The form value plus the spam-protection fields.
   * @returns Whether it worked, was rate limited or failed.
   */
  async send(request: ContactRequest): Promise<ContactResult> {
    this._sending.set(true);
    try {
      await firstValueFrom(this.http.post(ENDPOINT, request));
      return 'success';
    } catch (error) {
      return error instanceof HttpErrorResponse && error.status === TOO_MANY_REQUESTS
        ? 'rate-limited'
        : 'error';
    } finally {
      this._sending.set(false);
    }
  }
}
