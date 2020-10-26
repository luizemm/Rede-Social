import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _listPerson: Person[];

  constructor(private firestore : AngularFirestore) { }

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

    objPerson.followers = new Array<String>();
    objPerson.following = new Array<String>();
    
    if (this.isStringEmpty(objPerson.description)) {
      objPerson.description = "";
    }

    delete objPerson.id;
    console.log(objPerson);
    return this.firestore.collection('Person').add(objPerson);
  }

  getPersonByEmail(email: String) {
    return this.firestore.collection('Person').doc('bCUFRw1uugV8h9G3Hm04').ref.get().then((person)=>{
      if(person.exists) {
        const dadosCliente = person.data();
        return {
          id: person.id,
          name: dadosCliente.name,
          picture: dadosCliente.picture,
          cover: dadosCliente.cover,
          dateBirth: dadosCliente.dateBirth,
          email: dadosCliente.email,
          password: dadosCliente.password,
          followers: dadosCliente.followers,
          following: dadosCliente.following,
          description: dadosCliente.description,
        };
      }
      console.log('teste')
      return null;
    });
  }

  private isStringEmpty(string: String): boolean {
    if (string == '' || string == null)
      return true;

    return false;
  }
}
