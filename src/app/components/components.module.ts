import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { FooterToolbarComponent} from './footer-toolbar/footer-toolbar.component';

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
        ]
})

export class ComponentsModule{}