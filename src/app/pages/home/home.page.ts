import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  img : String = "../../assets/pictures/logo twitter.png";

  constructor() { }

  ngOnInit() {
  }

}
