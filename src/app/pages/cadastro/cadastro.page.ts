import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/post/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  objPerson : Person = new Person();
  confirmPass  : String;

  constructor(private personService : PersonService, private route : Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.personService.addPerson(this.objPerson);
    this.route.navigate(['/home']);
  }

}
