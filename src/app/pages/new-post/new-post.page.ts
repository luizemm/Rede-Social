import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PersonService } from 'src/app/services/person.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  person : Person;
  post : post = new post();

  constructor(private postService : PostService,
     private personService : PersonService,
     private route : Router,
     private auth: AuthGuardService) 
  { 
    try {
      this.person = this.auth.getUserLoged();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.post.name = this.person.name;
    this.post.picture = this.person.picture;
    this.post.time = '1h';
    this.postService.addPost(this.post);
    this.post = new post();
    this.route.navigate(['/home']);
  }

}
