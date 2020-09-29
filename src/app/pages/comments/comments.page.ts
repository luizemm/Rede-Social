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
  listPost : post[] = [];
  comment : post = new post();

  constructor(private postService : PostService,
    private route : ActivatedRoute) {
      this.post = this.postService.getPostById(Number.parseInt(this.route.snapshot.paramMap.get('id')));
      for(let comment of this.post.comments){
        this.listPost.push(postService.getPostById(comment));
      }
    }

  ngOnInit() {
    
  }

  onSubmit(){
    this.comment.name = 'teste';
    this.comment.picture = '../../assets/pictures/default profile.jpg';
    this.comment.time = '1h';
    this.postService.addComment(this.post.id, this.comment);
    this.listPost.unshift(this.postService.getPostById(this.post.comments[0]))
    this.comment = new post();
  }
}
