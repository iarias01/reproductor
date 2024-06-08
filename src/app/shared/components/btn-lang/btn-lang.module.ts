import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtnLangPage } from './btn-lang.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [BtnLangPage],
  exports: [BtnLangPage],
})
export class BtnLangPageModule {}
