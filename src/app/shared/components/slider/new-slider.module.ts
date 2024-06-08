import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSliderComponent } from './new-slider.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NewSliderComponent],
  imports: [CommonModule, IonicModule],
  exports: [NewSliderComponent],
})
export class NewSliderModule {}
