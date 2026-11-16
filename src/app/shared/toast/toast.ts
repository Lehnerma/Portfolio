import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast-service';

/** Renders the current toast of the `ToastService`. Place it once in the app root. */
@Component({
  selector: 'app-toast',
  styleUrl: './toast.scss',
  templateUrl: './toast.html',
})
export class Toast {
  protected readonly toast = inject(ToastService).toast;
}
