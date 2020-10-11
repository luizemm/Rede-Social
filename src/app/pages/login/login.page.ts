import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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

  constructor(private personService : PersonService, private route : Router, private auth : AuthGuardService) { }

  ngOnInit() {
    
  }

  onSubmit(){
    try {
      this.auth.signIn(this.user, this.password);
      this.route.navigate(["home"]);
    } catch (error) {
      console.log(error);
    }
  }
}
