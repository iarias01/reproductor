import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BackgroundModule } from '../shared/components/background/background.module';
import { StarsEfectsPageModule } from '../shared/components/stars-efects/stars-efects.module';
import { ButtonPageModule } from '../shared/components/button/button.module';
import { MusicBarPageModule } from '../shared/components/music-bar/music-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BackgroundModule,
    StarsEfectsPageModule,
    ButtonPageModule,
    MusicBarPageModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
