import { Component, HostListener, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-new-slider',
  templateUrl: './new-slider.component.html',
  styleUrls: ['./new-slider.component.scss'],
})
export class NewSliderComponent {
  @Input() templateHtml!: TemplateRef<any>;
  @Input() items: any = [];

  /**
   * it is saved where you clicked
   */
  private touchStartX = 0;

  /**
   * current click position X
   */
  private touchCurrentX = 0;

  /**
   * click hold
   */
  private readonly touchThreshold = 50;

  active = 0;

  ngOnInit() {
    this.loadShow();
  }

  loadShow() {
    for (let i = 0; i < this.items.length; i++) {
      this.getItemStyles(i);
    }
  }

  getItemStyles(index: number) {
    let styles: any = {};

    if (index === this.active) {
      styles.transform = `none`;
      styles.zIndex = 1;
      styles.filter = 'none';
      styles.opacity = 1;
    } else {
      let stt = index > this.active ? index - this.active : this.active - index;
      let sign = index > this.active ? 1 : -1;
      styles.transform = `translateX(${120 * sign * stt}px) scale(${
        1 - 0.2 * stt
      }) perspective(16px) rotateY(${sign * 1}deg)`;
      styles.zIndex = -stt;
      styles.filter = 'blur(5px)';
      styles.opacity = stt > 2 ? 0 : 0.6;
    }

    return styles;
  }

  next() {
    this.active =
      this.active + 1 < this.items.length ? this.active + 1 : this.active;
    this.loadShow();
  }

  prev() {
    this.active = this.active - 1 >= 0 ? this.active - 1 : this.active;
    this.loadShow();
  }

  /**
   * event that detects the click
   * @param event
   */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
  }

  /**
   * event that detects the movement of the click
   * @param event
   */
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    this.touchCurrentX = event.touches[0].clientX;
  }

  /**
   * event that detects when the click is released
   */
  @HostListener('touchend')
  onTouchEnd(): void {
    const touchDiff = this.touchCurrentX - this.touchStartX;

    if (touchDiff > this.touchThreshold) {
      this.prev();
    } else if (touchDiff < -this.touchThreshold) {
      this.next();
    }

    this.touchStartX = 0;
    this.touchCurrentX = 0;
  }
}
