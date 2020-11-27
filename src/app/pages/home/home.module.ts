import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from '../../components/components.module';
import { ExibePostPipe } from 'src/app/pipes/exibe-post.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ExibePostPipe]
})
export class HomePageModule {}
