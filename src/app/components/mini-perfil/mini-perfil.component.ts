import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-mini-perfil',
  templateUrl: './mini-perfil.component.html',
  styleUrls: ['./mini-perfil.component.scss'],
})
export class MiniPerfilComponent implements OnInit {

  @Input() idPerson: String;

  userLoged: Person;
  person: Person;

  isFollowing: boolean;
  isMyProfile: boolean;

  constructor(
    private auth: AuthGuardService,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.personService.getPersonById(this.idPerson.toString()).then((objPerson) => {
      if(objPerson.exists){
        const auxPerson = objPerson.data();
        this.person = {
          id: objPerson.id,
          name : auxPerson.name,
          picture : auxPerson.picture,
          cover: auxPerson.cover,
          dateBirth : auxPerson.dateBirth,
          email : auxPerson.email,
          password : auxPerson.password,
          followers: auxPerson.followers,
          following: auxPerson.following,
          description: auxPerson.description,
        }

        this.userLoged = this.auth.getUserLoged();
        if(this.userLoged.id === this.person.id){
          this.isMyProfile = true;
        } else {
          this.isMyProfile = false;
          this.isFollowing = this.userLoged.following.includes(this.person.id);
        }
      }
    });
  }

  follow(){
    this.userLoged.following.push(this.person.id);
    this.person.followers.push(this.userLoged.id);
    this.personService.updateFollower({...this.userLoged}).then(() => {
      this.personService.updateFollower({...this.person}).then(() => {
        this.isFollowing = true;
        this.auth.setUserLoged(this.userLoged);
      }).catch((erro) => {
        console.log(erro);
      });
    }).catch((erro) => {
      console.log(erro);
    });
  }

  unfollow() {
    let indexfollowing = this.userLoged.following.indexOf(this.person.id);
    let indexFollower = this.person.followers.indexOf(this.userLoged.id);

    this.userLoged.following.splice(indexfollowing);
    this.person.followers.splice(indexFollower);
    this.personService.updateFollower({...this.userLoged}).then(() => {
      this.personService.updateFollower({...this.person}).then(() => {
        this.isFollowing = false;
        this.auth.setUserLoged(this.userLoged);
      }).catch((erro) => {
        console.log(erro);
      });
    }).catch((erro) => {
      console.log(erro);
    });
  }
}
