import { Component, OnInit } from '@angular/core';
import { post } from 'src/app/models/post/post.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts : post[] = [
    {
      id: 1,
      name : "Luiz Eduardo",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "texto texto texto texto texto texto texto",
      like : 50,
      comment : 25,
      share : 40
    },
    {
      id: 2,
      name : "Luiz Eduardo",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "texto texto texto texto texto texto texto",
      like : 50,
      comment : 25,
      share : 40
    },
    {
      id: 3,
      name : "Luiz Eduardo",
      picture : "../../../assets/pictures/default profile.jpg",
      time : "12h",
      text : "texto texto texto texto texto texto texto",
      like : 50,
      comment : 25,
      share : 40
    },
    {
      id: 4,
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

  ngOnInit() {
  }

}
