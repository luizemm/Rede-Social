import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Person } from '../models/person.model';
import * as firebase from 'firebase';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private firestore : AngularFirestore,
    private fireAuth : AngularFireAuth,
    private file : File) { }

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

    if (objPerson.pictureName == null) {
      objPerson.pictureName = '';
    }

    if (objPerson.cover == null) {
      objPerson.cover = '/assets/pictures/default-cover.jpg';
    }

    if (objPerson.coverName == null) {
      objPerson.coverName = '';
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

  async updatePerson(objPerson : Person, params) {
    if (this.isStringEmpty(objPerson.name)) {
      return Promise.reject("Erro: Nome não pode ser vazio!");
    }

    if(!this.isStringEmpty(params.currentPassword)){
      if(params.currentPassword !== objPerson.password)
        return Promise.reject("Erro: Senha atual incorreta!");
      
      if(this.isStringEmpty(params.newPassword))
        return Promise.reject("Erro: O campo 'Nova senha' não pode ser vazio!");

      if(params.newPassword.length < 6)
        return Promise.reject("Erro: A nova senha deve possuir 6 dígitos ou mais!");

      objPerson.password = params.newPassword;

      this.fireAuth.currentUser.then((user) => {
        user.updatePassword(objPerson.password.toString());
      });
    }

    if(params.profilePic != objPerson.picture){
      try {
        params.profilePic = params.profilePic.replace('http://localhost/', 'file://');
        const blobImage = await this.createBlobImageFile(params.profilePic);

        if(objPerson.pictureName != "")
          await this.deleteImage(objPerson.pictureName);

        objPerson.picture = await this.uploadImage(blobImage, params.profilePicName);
        objPerson.pictureName = params.profilePicName;
      } catch (error) {
        console.log(error);
      }
    }

    if(params.coverPic != objPerson.cover){
      try {
        params.coverPic = params.coverPic.replace('http://localhost/', 'file://');
        const blobImage = await this.createBlobImageFile(params.coverPic);

        if(objPerson.coverName != "")
          await this.deleteImage(objPerson.coverName);

        objPerson.cover = await this.uploadImage(blobImage, params.coverPicName);
        objPerson.coverName = params.coverPicName;
      } catch (error) {
        console.log(error);
      }
    }

    objPerson.dateBirth = objPerson.dateBirth.split('T')[0];

    let id : String = objPerson.id;
    delete objPerson.id;

    return await this.firestore.doc(`Person/${id}`).update(objPerson);
  }

  updateFollower(objPersonFollower: Person){
    let id: String = objPersonFollower.id;
    delete objPersonFollower.id;

    return this.firestore.doc(`Person/${id}`).update(objPersonFollower);
  }

  createBlobImageFile(imagePath) : Promise<Blob>{
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(imagePath).then((fileData) => {

        const {name, nativeURL} = fileData;
        const path = nativeURL.substr(0, nativeURL.lastIndexOf('/') + 1);

        return this.file.readAsArrayBuffer(path, name);

      }).then((buffer) => {
        const blobImage = new Blob([buffer], {
          type: 'image/jpeg'
        });

        resolve(blobImage);

      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  async uploadImage(image, imageName) : Promise<string>{
    if(image){
      try {
        imageName = 'imagePerson/' + imageName;

        const uploadResult = await firebase.storage().ref().child(imageName).put(image);
        
        return uploadResult.ref.getDownloadURL();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteImage(imageName){
    try {
      imageName = 'imagePerson/' + imageName;

      await firebase.storage().ref().child(imageName).delete();

    } catch (error) {
      console.log(error);
    }
  }

  private isStringEmpty(string: String): boolean {
    if (string == '' || string == null)
      return true;

    return false;
  }
}
