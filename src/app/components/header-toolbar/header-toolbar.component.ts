import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
})
export class HeaderToolbarComponent implements OnInit {

  private img : String = "../../assets/pictures/logo twitter.png";

  search: String;

  constructor() { }

  ngOnInit() {}

}
