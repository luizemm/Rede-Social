import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  objPerson : Person = new Person();
  confirmPass  : String;

  constructor(
    private personService : PersonService,
    private route : Router,
    private mensagenService: MensagensService) { }

  ngOnInit() {
  }

  onSubmit(){
    try {
      this.personService.addPerson(this.objPerson);
      this.route.navigate(['/login']);
    } catch (error) {
      this.mensagenService.addMensagem(error);
    }
  }

}
