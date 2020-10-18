import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _listPerson: Person[] = [
    {
      name: 'Fulano',
      picture: '/assets/pictures/default-profile.jpg',
      cover: '/assets/pictures/default-cover.jpg',
      dateBirth: '01/01/2000',
      email: 'admin@admin.com',
      password: 'admin',
      followers: [],
      following: [],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum interdum mi nec lectus consequat, et porta quam consequat. Donec dolor libero, euismod at congue vel, vehicula sit amet lorem.'
    }
  ]

  constructor() { }

  getListPerson(): Person[] { return this._listPerson; }

  addPerson(objPerson: Person) {
    if (this.isStringEmpty(objPerson.name)) {
      throw new Error("Name can't be empty.");
    }

    if (objPerson.picture == null) {
      objPerson.picture = '/assets/pictures/default-profile.jpg';
    }

    if (objPerson.cover == null) {
      objPerson.cover = '/assets/pictures/default-cover.jpg';
    }

    if (this.isStringEmpty(objPerson.email)) {
      throw new Error("Email can't be empty.");
    }

    if (this.isStringEmpty(objPerson.password)) {
      throw new Error("Password can't be empty.");
    }

    objPerson.followers = new Array<Person>();
    objPerson.following = new Array<Person>();
    
    if (this.isStringEmpty(objPerson.description)) {
      objPerson.description = "";
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
