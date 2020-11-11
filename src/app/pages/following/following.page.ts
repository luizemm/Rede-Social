import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {

  person: Person;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
  ) {

   }

  ngOnInit() {
    this.personService.getPersonById(this.route.snapshot.paramMap.get('id')).then((objPerson) => {
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
      }
    }); 
  }

}
