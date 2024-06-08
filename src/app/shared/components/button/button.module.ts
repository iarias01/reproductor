import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ButtonPage } from './button.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ButtonPage],
  exports: [ButtonPage],
})
export class ButtonPageModule {}
