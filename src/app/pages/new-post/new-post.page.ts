import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  private picture : String = '../../../assets/pictures/default profile.jpg';
  //private textarea_height : String;

  constructor() { }

  ngOnInit() {
    //this.textarea_height = (window.innerHeight - 56 * 3 - 16 * 4 - 24 - 2) + 'px';
  }

}
