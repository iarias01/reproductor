import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarsEfectsPage } from './stars-efects.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [StarsEfectsPage],
  exports: [StarsEfectsPage],
})
export class StarsEfectsPageModule {}
