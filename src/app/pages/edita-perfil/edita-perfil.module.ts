import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaPerfilPageRoutingModule } from './edita-perfil-routing.module';

import { EditaPerfilPage } from './edita-perfil.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaPerfilPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EditaPerfilPage]
})
export class EditaPerfilPageModule {}
