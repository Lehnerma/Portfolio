import { Component, computed, input, output, signal } from '@angular/core';
import { PointSticker } from '../../interfaces/point-sticker';
import {
  calcClippedAmount,
  calcFadeOpacity,
  clipRectangle,
  createFold,
  createGuidePoint,
  createRectangleCorners,
  nextProgress,
  toClipPath,
  toLocalPoint,
  toReflectionMatrix,
} from './sticker-geometry';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.html',
  styleUrl: './sticker.scss',
})
export class Sticker {
  readonly width = input(240);
  readonly height = input(240);
  /** Share of folded area from which the sticker fades out. Must be smaller than 1. */
  readonly fadeThreshold = input(0.9);
  readonly peeled = output<void>();

  protected readonly isPeeled = signal(false);
  private readonly pointer = signal<PointSticker | null>(null);
  private readonly keyboardProgress = signal(0);

  private readonly corners = computed(() => createRectangleCorners(this.width(), this.height()));

  private readonly fold = computed(() => createFold(this.width(), this.pointer()));

  /**
   * Clip path of the still attached front part.
   * */
  protected readonly topClipPath = computed(() => {
    const fold = this.fold();
    return fold ? toClipPath(clipRectangle(this.corners(), fold, -1)) : 'none';
  });

  /**
   * Clip path of the folded back part.
   * */
  protected readonly backClipPath = computed(() => {
    const fold = this.fold();
    return fold ? toClipPath(clipRectangle(this.corners(), fold, 1)) : 'inset(100%)';
  });

  /**
   * Transform that mirrors the back part across the fold line.
   */
  protected readonly backTransform = computed(() => {
    const fold = this.fold();
    return fold ? toReflectionMatrix(fold) : 'none';
  });

  /**
   * Share (0 to 1) of the sticker that is folded away.
   */
  protected readonly amountClipped = computed(() => {
    const fold = this.fold();
    if (!fold) {
      return 0;
    }
    return calcClippedAmount(this.corners(), fold, this.width(), this.height());
  });

  /**
   * Peeled share as a whole percentage, used for assistive technology.
   */
  protected readonly percentPeeled = computed(() => Math.round(this.amountClipped() * 100));

  /**
   * Opacity of the sticker, fading out near the end of the peel.
   */
  protected readonly fadeOpacity = computed(() =>
    calcFadeOpacity(this.amountClipped(), this.fadeThreshold()),
  );

  /**
   * Captures the pointer on the sticker and applies its first position.
   */
  protected startDrag(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.updatePointer(event);
  }

  /**
   * Updates the fold from the current pointer position while the pointer is captured.
   */
  protected updatePointer(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (this.isPeeled() || !target.hasPointerCapture(event.pointerId)) {
      return;
    }
    this.pointer.set(toLocalPoint(event, target.getBoundingClientRect()));
    this.finishIfPeeled();
  }

  /**
   * Peels the sticker stepwise with the keyboard (arrow keys, Home, End).
   */
  protected handleKey(event: KeyboardEvent): void {
    const progress = nextProgress(event.key, this.keyboardProgress());
    if (this.isPeeled() || progress === null) {
      return;
    }
    event.preventDefault();
    this.keyboardProgress.set(progress);
    this.pointer.set(createGuidePoint(this.width(), this.height(), progress));
    this.finishIfPeeled();
  }

  /**
   * Marks the sticker as peeled and emits `peeled` once it is fully folded away.
   */
  private finishIfPeeled(): void {
    if (this.amountClipped() < 1) {
      return;
    }
    this.isPeeled.set(true);
    this.peeled.emit();
  }

  reset(): void {
    this.isPeeled.set(false);
    this.pointer.set(null);
    this.keyboardProgress.set(0);
  }
}
