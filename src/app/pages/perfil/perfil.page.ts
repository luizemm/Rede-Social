import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  person: Person = new Person();
  posts : post[];

  constructor(
    private auth: AuthGuardService,
    private postService: PostService
  ) {
    this.person = this.auth.getUserLoged();
    this.posts = this.postService.getPostByEmail(this.person.email);
   }

  ngOnInit() {

  }

}
