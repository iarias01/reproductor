import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicBarPage } from './music-bar.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MusicBarPage],
  exports: [MusicBarPage],
})
export class MusicBarPageModule {}
