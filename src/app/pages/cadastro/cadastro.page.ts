import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Person } from 'src/app/models/person.model';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PersonService } from 'src/app/services/person.service';
import { Callback } from 'src/app/Utils/callback';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  objPerson : Person = new Person();
  confirmPass : String;

  constructor(
    private personService : PersonService,
    private route : Router,
    private mensagenService: MensagensService,
    private auth : AuthGuardService,
    private menu : AppComponent) { }

  ngOnInit() {
  }

  onSubmit(){
    this.personService.addPerson(this.objPerson, this.confirmPass).then(() => {
      this.auth.signIn(this.objPerson.email, this.objPerson.password, new Callback(
        () => {
          this.menu.getUserLoged();
          this.route.navigate(['/home']);
        },
        (error) => {
          this.mensagenService.addMensagem(error);
        }
      ));
    }).catch((error) => {
      this.mensagenService.addMensagem(error);
    });
  }

}
