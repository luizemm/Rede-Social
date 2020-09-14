import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  img : String = "../../assets/pictures/logo twitter.png";

  constructor() { }

  ngOnInit() {
  }

}
