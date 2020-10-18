import { Injectable } from '@angular/core';
import { post } from '../models/post.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _listPost : post[] = [
    {
      id: 1,
      name : "Fulano",
      email : "admin@admin.com",
      picture : "/assets/pictures/default-profile.jpg",
      time : "12h",
      text : "texto texto texto texto texto texto texto",
      like : 23,
      comments : [],
      isComment : false,
      share : 2
    },
  ];

  constructor() { }

  getListPost() : post[] {return this._listPost;}

  addPost(post:post) {
    post.id = this.getListPost().length + 1;
    post.isComment = false;
    this.getListPost().unshift(post);
  }

  addComment(id:Number, post:post){
    let objPost = this.getPostById(id);
    post.id = this.getListPost().length + 1;
    post.isComment = true;
    this.getListPost().unshift(post);
    objPost.comments.unshift(post.id);
  }

  getPostById(id:Number) : post{
    for(let post of this._listPost){
      if(id === post.id)
        return post;
    }
  }

  getPostByEmail(email: String): post[] {
    return this.getListPost().filter(x => x.email == email);
  }
}
