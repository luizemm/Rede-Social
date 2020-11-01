import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private firestore : AngularFirestore) { }

  getListPerson() {
    return this.firestore.collection('Person').snapshotChanges();
  }

  addPerson(objPerson: Person) {
    if (this.isStringEmpty(objPerson.name)) {
      return Promise.reject("Erro: Nome não pode ser vazio!");
    }

    if (objPerson.picture == null) {
      objPerson.picture = '/assets/pictures/default-profile.jpg';
    }

    if (objPerson.cover == null) {
      objPerson.cover = '/assets/pictures/default-cover.jpg';
    }

    if (this.isStringEmpty(objPerson.email)) {
      return Promise.reject("Erro: Email não pode ser vazio!");
    }

    if (this.isStringEmpty(objPerson.password)) {
      return Promise.reject("Erro: Senha não pode ser vazio!");
    }

    objPerson.followers = new Array<String>();
    objPerson.following = new Array<String>();
    
    if (this.isStringEmpty(objPerson.description)) {
      objPerson.description = "";
    }

    delete objPerson.id;

    return this.firestore.collection('Person').add({...objPerson});
  }

  getPersonByEmail(email: String) {
    return this.firestore.collection('Person', ref => ref.where('email', '==', email)).snapshotChanges();
  }

  getPersonByEmailGet(email: String) {
    return this.firestore.collection('Person', ref => ref.where('email', '==', email)).get();
  }

  updatePerson(objPerson : Person, currentPassword : String, newPassword : String) {
    if (this.isStringEmpty(objPerson.name)) {
      return Promise.reject("Erro: Nome não pode ser vazio!");
    }

    if(!this.isStringEmpty(currentPassword)){
      if(currentPassword !== objPerson.password)
      return Promise.reject("Erro: Senha atual incorreta!");
      
      if(this.isStringEmpty(newPassword))
      return Promise.reject("Erro: O campo 'Nova senha' não pode ser vazio!");

      objPerson.password = newPassword;
    }

    let id : String = objPerson.id;
    delete objPerson.id;
    return this.firestore.doc(`Person/${id}`).update(objPerson);
  }

  private isStringEmpty(string: String): boolean {
    if (string == '' || string == null)
      return true;

    return false;
  }
}
