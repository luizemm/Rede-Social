import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PersonService } from 'src/app/services/person.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  post : post;
  person : Person;
  listPost : post[] = [];
  comment : post = new post();

  constructor(private postService : PostService,
    private personService : PersonService,
    private route : ActivatedRoute,
    private auth: AuthGuardService) 
  {
    this.post = this.postService.getPostById(Number.parseInt(this.route.snapshot.paramMap.get('id')));
    
    try {
      this.person = this.auth.getUserLoged();
    } catch (error) {
      console.log(error);
    }

    for(let comment of this.post.comments){
      this.listPost.push(postService.getPostById(comment));
    }
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.comment.name = this.person.name;
    this.comment.picture = this.person.picture;
    this.comment.time = '1h';
    this.postService.addComment(this.post.id, this.comment);
    this.listPost.unshift(this.postService.getPostById(this.post.comments[0]))
    this.comment = new post();
  }
}
