import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  EColorButton,
  EIconPositionButton,
  ERadioButton,
  ESizeButton,
  ETypeButton,
} from '../../interfaces/button.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
})
export class ButtonPage implements OnChanges {
  @Input() text = '';
  @Input() iconOnly = false;
  @Input() icon = '';
  @Input() iconPosition: 'left' | 'right' = EIconPositionButton.LEFT;
  @Input() type: 'clear' | 'outline' | 'solid' = ETypeButton.SOLID;
  @Input() color:
    | 'blue'
    | 'red'
    | 'yellow'
    | 'green'
    | 'white'
    | 'black'
    | 'gray' = EColorButton.BLACK;
  @Input() width = '';
  @Input() radius: '0' | '5px' | '30px' | '50%' = ERadioButton.NONE;
  @Input() disabled = false;
  @Input() size: 'xs' | 'md' | 'lg' = ESizeButton.LG;
  @Input() isFullWidth = false;
  @Input() margin = '0 auto';
  @Input() textShadow = false;
  @Input() opacity = false;
  @ViewChild('customButton') customButton!: ElementRef;
  @ViewChild('label') label!: ElementRef;

  customClass = '';
  styles = {};

  @Output() emitClick = new EventEmitter();

  ngOnChanges(): void {
    this.customClass = [
      this.type,
      this.size,
      this.opacity ? this.color + '--transparent' : this.color,
      this.iconOnly ? 'icon-only' : '',
      this.textShadow ? 'text-shadow' : '',
      this.isFullWidth ? 'full-width' : '',
    ].join(' ');
    this.styles = {
      width: this.isFullWidth ? '100%' : this.width,
      margin: this.margin,
      opacity: this.opacity,
      'justify-content': this.width === '100%' ? 'center' : 'space-around',
      'border-radius': this.radius,
    };

    setTimeout(() => {
      if (this.label && !this.iconOnly && this.icon) {
        this.label.nativeElement.style.marginRight = '7px';
        this.label.nativeElement.style.marginLeft = '0';
        if (this.iconPosition === 'left') {
          this.label.nativeElement.style.marginLeft = '7px';
          this.label.nativeElement.style.marginRight = '0';
        }
      }
    }, 300);

    if (this.customButton && this.iconOnly) {
      this.setButtonHeight();
      return;
    }
    if (this.customButton)
      this.customButton.nativeElement.style.height = 'auto';
  }

  setButtonHeight() {
    setTimeout(() => {
      const button = this.customButton.nativeElement;
      const computedStyle = getComputedStyle(button);
      const paddingX = parseInt(computedStyle.paddingLeft, 10);
      const buttonWidth = button.getBoundingClientRect().width;
      button.style.height = `${buttonWidth}px`;
    }, 200);
  }
}
