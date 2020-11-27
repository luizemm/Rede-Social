import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { FooterToolbarComponent } from './footer-toolbar/footer-toolbar.component';
import { RouterModule } from '@angular/router';
import { MensagensComponent } from './mensagens/mensagens.component';
import { CommonModule } from '@angular/common';
import { MiniPerfilComponent } from './mini-perfil/mini-perfil.component';
import { LifeTimePostPipe } from '../pipes/life-time-post.pipe';

@NgModule({
    declarations: [
        PostComponent,
        HeaderToolbarComponent,
        FooterToolbarComponent,
        MensagensComponent,
        MiniPerfilComponent,
        LifeTimePostPipe
    ],
    exports: [
        PostComponent,
        HeaderToolbarComponent,
        FooterToolbarComponent,
        MensagensComponent,
        MiniPerfilComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})

export class ComponentsModule { }