import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';

import { CommentsPage } from './comments.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
