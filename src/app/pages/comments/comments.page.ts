import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { post } from 'src/app/models/post.module';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  post : post;

  constructor(private postService : PostService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.post = this.postService.getPostById(this.route.snapshot.params['id']);
  }

}
