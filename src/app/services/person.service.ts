import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _listPerson : Person[] = [
    {
      name : 'Fulano',
      picture : '../../assets/pictures/default profile.jpg',
      dateBirth : '01/01/2000',
      email : 'admin@admin.com',
      password : 'admin'
    }
  ]

  constructor() { }

  getListPerson() : Person[] {return this._listPerson;}

  addPerson(objPerson : Person) {
    this._listPerson.push(objPerson);
  }

  getPersonByEmail(email : String) : Person{
    for(let person of this.getListPerson()){
      if(person.email == email)
        return person;
    }

    return null;
  }
}
