import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { FooterToolbarComponent} from './footer-toolbar/footer-toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
         PostComponent,
         HeaderToolbarComponent,
         FooterToolbarComponent
        ],
    exports: [
         PostComponent,
         HeaderToolbarComponent,
         FooterToolbarComponent
        ],
    imports: [
        RouterModule
        ]
})

export class ComponentsModule{}