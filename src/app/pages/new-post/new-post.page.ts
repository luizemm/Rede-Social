import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { post } from 'src/app/models/post.module';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  private picture : String = '../../../assets/pictures/default profile.jpg';
  post : post = new post();

  constructor(private postService : PostService, private route : Router) { }

  ngOnInit() {
    
  }

  onSubmit(){
    this.post.name = 'teste';
    this.post.picture = '../../assets/pictures/default profile.jpg';
    this.post.time = '1h';
    this.postService.addPost(this.post);
    this.post = new post();
    this.route.navigate(['/home']);
  }

}
