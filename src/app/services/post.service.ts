import { Injectable } from '@angular/core';
import { post } from '../models/post/post.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _listPost : post[] = [
    {
      id: 2,
      name : "Igor",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue mauris nec massa laoreet, suscipit facilisis ipsum accumsan. Mauris nibh nulla, dictum et sem sit amet, tincidunt sodales lorem. Proin nunc lacus, vehicula vitae arcu sit amet, mollis pulvinar ipsum. Pellentesque a quam sed odio pulvinar hendrerit ac blandit eros. ",
      like : 50,
      comment : 25,
      share : 40
    },
    {
      id: 1,
      name : "Luiz Eduardo",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "texto texto texto texto texto texto texto",
      like : 50,
      comment : 25,
      share : 40
    }
  ];

  constructor() { }

  getListPost() {return this._listPost;}

  addPost(post:post) {
    post.id = this._listPost.length + 1;
    this._listPost.unshift(post);
  }

  getPostById(id:Number) {
    for(let post of this._listPost){
      if(id == post.id)
        return post;
    }
  }
}
