import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { PointSticker } from '../../interfaces/point-sticker';
import {
  calcClippedAmount,
  calcFadeOpacity,
  clipRectangle,
  createFold,
  createGuidePoint,
  createRectangleCorners,
  easeToward,
  nextProgress,
  toClipPath,
  toLocalPoint,
  toGradientAngle,
  toGradientPosition,
  toLiftedReflectionMatrix,
} from './sticker-geometry';

@Component({
  selector: 'app-sticker',
  host: {
    '[style.--fold-angle]': 'foldAngle()',
    '[style.--fold-position]': 'foldPosition()',
  },
  templateUrl: './sticker.html',
  styleUrl: './sticker.scss',
})
export class Sticker {
  readonly width = input(240);
  readonly height = input(240);
  /** Share of folded area from which the sticker fades out. Must be smaller than 1. */
  readonly fadeThreshold = input(0.9);
  /** Height of the folded flap above the sticker in px per px of distance to the fold line. */
  readonly lift = input(0.3);
  /** Peel progress (0 to 1) of the corner teaser on hover and focus. */
  readonly hintLift = input(0.12);
  /** Share of the remaining distance the teaser covers per frame (0 to 1). */
  readonly hintSpeed = input(0.15);
  readonly peeled = output<void>();

  protected readonly isPeeled = signal(false);
  private readonly pointer = signal<PointSticker | null>(null);
  private readonly keyboardProgress = signal(0);
  private readonly hint = signal(0);
  private hintFrame = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.hintFrame));
  }

  /**
   * Virtual pointer of the teaser. Null while the teaser is not visible.
   */
  private readonly hintPoint = computed(() =>
    this.hint() > 0 ? createGuidePoint(this.width(), this.height(), this.hint()) : null,
  );

  private readonly corners = computed(() => createRectangleCorners(this.width(), this.height()));

  private readonly fold = computed(() =>
    createFold(this.width(), this.pointer() ?? this.hintPoint()),
  );

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
   * Transform that mirrors the back part across the fold line and lifts it towards the viewer.
   */
  protected readonly backTransform = computed(() => {
    const fold = this.fold();
    return fold ? toLiftedReflectionMatrix(fold, this.lift()) : 'none';
  });

  /**
   * Gradient angle of the fold, used for the light and shadow gradients in CSS.
   */
  protected readonly foldAngle = computed(() => {
    const fold = this.fold();
    return `${fold ? toGradientAngle(fold) : 0}deg`;
  });

  /**
   * Gradient position of the fold line. Off-screen while nothing is folded.
   */
  protected readonly foldPosition = computed(() => {
    const fold = this.fold();
    return `${fold ? toGradientPosition(fold, this.width(), this.height()) : -100}%`;
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
   * Lifts the corner as a teaser when a mouse enters or the sticker receives focus.
   */
  protected showHint(event: Event): void {
    if (event instanceof PointerEvent && event.pointerType !== 'mouse') {
      return;
    }
    this.animateHint(this.hintLift());
  }

  /**
   * Lets the corner fall back when the mouse leaves or the sticker loses focus.
   */
  protected hideHint(): void {
    this.animateHint(0);
  }

  /**
   * Starts the teaser animation towards the target. Jumps directly if the user
   * prefers reduced motion.
   */
  private animateHint(target: number): void {
    cancelAnimationFrame(this.hintFrame);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.hint.set(target);
      return;
    }
    this.hintFrame = requestAnimationFrame(() => this.stepHint(target));
  }

  /**
   * Advances the teaser by one frame and schedules the next one until the target is reached.
   */
  private stepHint(target: number): void {
    const next = easeToward(this.hint(), target, this.hintSpeed());
    this.hint.set(next);
    if (next !== target) {
      this.hintFrame = requestAnimationFrame(() => this.stepHint(target));
    }
  }

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
