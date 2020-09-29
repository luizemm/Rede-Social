import { Injectable } from '@angular/core';
import { post } from '../models/post.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _listPost : post[] = [
    {
      id: 3,
      name : "Fulano",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "texto texto texto texto texto texto texto",
      like : 23,
      comments : [],
      isComment : true,
      share : 2
    },
    {
      id: 2,
      name : "Igor",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue mauris nec massa laoreet, suscipit facilisis ipsum accumsan. Mauris nibh nulla, dictum et sem sit amet, tincidunt sodales lorem. Proin nunc lacus, vehicula vitae arcu sit amet, mollis pulvinar ipsum. Pellentesque a quam sed odio pulvinar hendrerit ac blandit eros. ",
      like : 50,
      comments : [],
      isComment : false,
      share : 40
    },
    {
      id: 1,
      name : "Luiz Eduardo",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "texto texto texto texto texto texto texto",
      like : 50,
      comments : [3],
      isComment : false,
      share : 40
    }
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
}
