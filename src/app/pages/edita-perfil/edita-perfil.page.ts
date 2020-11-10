import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Person } from 'src/app/models/person.model';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edita-perfil',
  templateUrl: './edita-perfil.page.html',
  styleUrls: ['./edita-perfil.page.scss'],
})
export class EditaPerfilPage implements OnInit {

  person : Person;
  isEditPassword : boolean = false;
  currentPassword : String;
  newPassword : String;

  constructor(
    private auth : AuthGuardService, 
    private mensagem : MensagensService,
    private route : Router,
    private personService : PersonService,
    private appComp : AppComponent) 
  {
    this.person = {...auth.getUserLoged()};
  }

  ngOnInit() {
  }

  editPassword() {
    this.isEditPassword = true;
  }

  onSubmit(){
    this.personService.updatePerson({...this.person}, this.currentPassword, this.newPassword).then(()=>{
      this.personService.getPersonByEmail(this.person.email).subscribe((objPerson)=>{
        this.person = objPerson.map((item) => {
          const personData = item.payload.doc.data();
          return {
            id: item.payload.doc.id,
            name: personData['name'],
            picture: personData['picture'],
            cover: personData['cover'],
            dateBirth: personData['dateBirth'],
            email: personData['email'],
            password: personData['password'],
            followers: personData['followers'],
            following: personData['following'],
            description: personData['description'],
          };
        })[0];
        this.auth.setUserLoged(this.person);
        this.appComp.getUserLoged();
        this.route.navigate(['/perfil/' + this.person.id]);
      });
    }).catch((error)=>{
      this.mensagem.addMensagem(error);
    });
  }
}
