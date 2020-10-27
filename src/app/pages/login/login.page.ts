import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PersonService } from 'src/app/services/person.service';
import { Callback } from 'src/app/Utils/callback';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  img : String = "/assets/pictures/logo twitter.png";
  user : String;
  password : String;

  constructor(
    private personService : PersonService,
    private route : Router,
    private auth : AuthGuardService,
    private mensagemService: MensagensService,
    private menu : AppComponent) { }

  ngOnInit() {
    
  }

  onSubmit(){
    this.auth.signIn(this.user, this.password, new Callback(
      () => {
        this.menu.getUserLoged();
        this.route.navigate(['/home']);
      },
      (msg) => {
        this.mensagemService.addMensagem(msg);
      }
    ));
  }
}
