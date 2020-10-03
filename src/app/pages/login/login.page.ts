import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  img : String = "../../assets/pictures/logo twitter.png";
  user : String;
  password : String;

  constructor(private personService : PersonService, private route : Router) { }

  ngOnInit() {
  }

  onSubmit(){
    localStorage['login'] = this.personService.getPersonByEmail('admin@admin.com')
    this.route.navigate(['/home']);
  }

}
