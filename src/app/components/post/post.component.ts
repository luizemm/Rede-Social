import { Component, Input, OnInit } from '@angular/core';
import { post } from 'src/app/models/post.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post : post = new post();

  constructor() {
  }

  ngOnInit() { }

}
