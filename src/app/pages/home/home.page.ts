import { Component, OnInit } from '@angular/core';
import { post } from 'src/app/models/post.module';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts : post[];

  constructor(private postService : PostService) {
    this.posts = postService.getListPost();
  }

  ngOnInit() {
    
  }

}
