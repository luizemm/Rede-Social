import { Component, OnInit } from '@angular/core';
import { post } from 'src/app/models/post.module';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts : post[] = [];

  constructor(private postService : PostService) {
    this.postService.getListPost().subscribe((listPost)=>{
      this.posts = listPost.map((item)=>{
        const postData = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          name: postData['name'],
          idPerson: postData['idPerson'],
          picture: postData['picture'],
          time: postData['time'],
          text: postData['text'],
          like: postData['like'],
          comments: postData['comments'],
          isComment: postData['isComment'],
          share: postData['share'],
          media: postData['media'],
          mediaName: postData['mediaName'],
        }
      })
    });
  }

  ngOnInit() {

  }

}
