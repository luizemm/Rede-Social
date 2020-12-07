import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post : post = new post();
  person : Person;

  constructor(private postService : PostService,
    private auth : AuthGuardService) { }

  ngOnInit() { 
    this.person = this.auth.getUserLoged();
  }

  wasLiked():boolean {
    if(this.post != undefined){
      for(let idPost of this.post.like){
        if(this.person.id === idPost)
          return true;
      }
    }
    return false;
  }

  like(){
    this.postService.likePost(this.person.id.toString(), this.post);
  }

  unlike(){
    this.postService.unlikePost(this.person.id.toString(), this.post);
  }
}
