import { Component, OnInit } from '@angular/core';
import { post } from 'src/app/models/post/post.module';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  post : post = {
    id: 1,
    name : "Luiz Eduardo",
    picture : "../../../assets/pictures/default profile.jpg",
    time : "12h",
    text : "texto texto texto texto texto texto texto",
    like : 50,
    comment : 25,
    share : 40
  }

  constructor() { }

  ngOnInit() {
  }

}
