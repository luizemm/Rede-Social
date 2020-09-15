import { Component, OnInit } from '@angular/core';
import { post } from 'src/app/models/post/post.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  img : String = "../../assets/pictures/logo twitter.png";

  posts : post[] = [
    {
      name : "Luiz Eduardo",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      post : "texto texto texto texto texto texto texto",
      like : 50,
      comment : 25,
      share : 40
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
