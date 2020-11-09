import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private firestore : AngularFirestore,
    private fireAuth : AngularFireAuth) { }

  getListPerson() {
    return this.firestore.collection('Person').snapshotChanges();
  }

  addPerson(objPerson: Person, confirmPass : String) {
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

    if(objPerson.password.length < 6){
      return Promise.reject("Erro: A senha deve possuir 6 ou mais dígitos!");
    }

    if(objPerson.password !== confirmPass){
      return Promise.reject("Erro: As senhas não conferem!");
    }

    objPerson.dateBirth = objPerson.dateBirth.split('T')[0];

    objPerson.followers = new Array<String>();
    objPerson.following = new Array<String>();
    
    if (this.isStringEmpty(objPerson.description)) {
      objPerson.description = "";
    }

    delete objPerson.id;

    return this.fireAuth.createUserWithEmailAndPassword(objPerson.email.toString(), objPerson.password.toString()).then(
      (auth) => {
        return this.firestore.collection('Person').doc(auth.user.uid).set({...objPerson});
      }
    ).catch((erro) => {
      switch(erro.code){
        case 'auth/invalid-email' :
          return Promise.reject("Erro: Email inválido!");
        case 'auth/email-already-in-use' :
          return Promise.reject("Erro: Esse email já está cadastrado!");
      }
    });
  }

  getPersonByEmail(email: String) {
    return this.firestore.collection('Person', ref => ref.where('email', '==', email)).snapshotChanges();
  }

  getPersonById(id : string) {
    return this.firestore.collection('Person').doc(id).ref.get();
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

      if(newPassword.length < 6){
        return Promise.reject("Erro: A nova senha deve possuir 6 dígitos ou mais!");
      }

      objPerson.password = newPassword;

      this.fireAuth.currentUser.then((user) => {
        user.updatePassword(objPerson.password.toString());
      });
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
