import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
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
  declarations: [EventPage],
  exports: [EventPage],
})
export class EventPageModule {}
