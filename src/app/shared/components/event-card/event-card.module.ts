import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCardPage } from './event-card.page';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonPageModule } from '../button/button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ButtonPageModule,
  ],
  declarations: [EventCardPage],
  exports: [EventCardPage],
})
export class EventCardPageModule {}
