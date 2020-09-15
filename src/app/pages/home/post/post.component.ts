import { Component, Input, OnInit } from '@angular/core';
import { post } from 'src/app/models/post/post.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  name = "Luiz Eduardo";
  picture = "../../../assets/pictures/default profile.jpg";
  time = "12h";
  post = "texto texto texto texto texto texto texto";
  like = 50;
  comment = 25;
  share = 40;
  
  constructor() { }

  ngOnInit() {}

}
