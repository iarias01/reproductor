import { isFormControl } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

export interface IButton {
  text?: string;
  iconOnly?: boolean;
  icon?: string;
  iconPosition?: EIconPositionButton;
  disabled?: boolean;
  isFullWidth?: boolean;
  type?: ETypeButton;
  color?: EColorButton;
  raidus?: ERadioButton;
  size?: ESizeButton;
}

export enum ESizeButton {
  XS = 'xs',
  MD = 'md',
  LG = 'lg',
}

export enum ETypeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  SOLID = 'solid',
}

export enum ERadioButton {
  NONE = '0',
  XS = '5px',
  MD = '30px',
  FULL = '50%',
}

export enum EColorButton {
  BLUE = 'blue',
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
  WHITE = 'white',
  BLACK = 'black',
}

export enum EIconPositionButton {
  LEFT = 'left',
  RIGHT = 'right',
}
