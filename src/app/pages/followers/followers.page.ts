import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  person: Person;
  
  constructor(
    private personService: PersonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.personService.getPersonById(this.route.snapshot.paramMap.get('id')).then((objPerson) => {
      if(objPerson.exists){
        const auxPerson = objPerson.data();
        this.person = {
          id: objPerson.id,
          name : auxPerson.name,
          picture : auxPerson.picture,
          cover: auxPerson.cover,
          pictureName : auxPerson.pictureName,
          coverName: auxPerson.coverName,
          dateBirth : auxPerson.dateBirth,
          email : auxPerson.email,
          password : auxPerson.password,
          followers: auxPerson.followers,
          following: auxPerson.following,
          description: auxPerson.description,
        }
      }
    }); 
  }

}
