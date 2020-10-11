import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _listPerson: Person[] = [
    {
      name: 'Fulano',
      picture: '../../assets/pictures/default profile.jpg',
      dateBirth: '01/01/2000',
      email: 'admin@admin.com',
      password: 'admin'
    }
  ]

  constructor() { }

  getListPerson(): Person[] { return this._listPerson; }

  addPerson(objPerson: Person) {
    if (objPerson.picture) {
      objPerson.picture = '../../assets/pictures/default profile.jpg';
    }

    if (this.isStringEmpty(objPerson.name)) {
      throw new Error("Name can't be empty.");
    }

    if (this.isStringEmpty(objPerson.email)) {
      throw new Error("Email can't be empty.");
    }

    if (this.isStringEmpty(objPerson.password)) {
      throw new Error("Password can't be empty.");
    }

    this._listPerson.push(objPerson);
  }

  getPersonByEmail(email: String): Person {
    for (let person of this.getListPerson()) {
      if (person.email == email)
        return person;
    }

    return null;
  }

  private isStringEmpty(string: String): boolean {
    if (string == '' || string == null)
      return true;

    return false;
  }
}
