import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit{

  person: Person = new Person();
  posts : post[];

  constructor(
    private auth: AuthGuardService,
    private postService: PostService
  ) {
    this.getData();
  }

  getData(){
  this.person = this.auth.getUserLoged();
  this.postService.getPostByEmail(this.person.email).subscribe((myPosts)=>{
    this.posts = myPosts.map((item)=>{
      const postData = item.payload.doc.data();
      return {
        id: item.payload.doc.id,
        name: postData['name'],
        email: postData['email'],
        picture: postData['picture'],
        time: postData['time'],
        text: postData['text'],
        like: postData['like'],
        comments: postData['comments'],
        isComment: postData['isComment'],
        share: postData['share'],
      }
    })
  });
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getData();
  }
}
