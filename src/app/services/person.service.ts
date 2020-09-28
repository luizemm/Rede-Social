import { Injectable } from '@angular/core';
import { Person } from '../models/post/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _listPerson : Person[] = [
    {
      name : 'admin',
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
}
