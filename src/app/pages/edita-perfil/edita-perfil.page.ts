import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Person } from 'src/app/models/person.model';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PersonService } from 'src/app/services/person.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-edita-perfil',
  templateUrl: './edita-perfil.page.html',
  styleUrls: ['./edita-perfil.page.scss'],
})
export class EditaPerfilPage implements OnInit {

  person : Person;
  isEditPassword : boolean = false;
  params = {
    currentPassword: '',
    newPassword : '',
    profilePic : '',
    profilePicName : '',
    coverPic : '',
    coverPicName : ''
  }

  constructor(
    private auth : AuthGuardService, 
    private mensagem : MensagensService,
    private route : Router,
    private personService : PersonService,
    private appComp : AppComponent,
    private camera: Camera,
    private file: File,
    private webView: WebView,
    private platform : Platform,
    private filePath : FilePath) 
  {
    this.person = {...auth.getUserLoged()};
    this.params.profilePic = this.person.picture.toString();
    this.params.coverPic = this.person.cover.toString();
  }

  ngOnInit() {
  }

  editPassword() {
    this.isEditPassword = true;
  }

  onSubmit(){
    this.personService.updatePerson({...this.person}, this.params).then(()=>{
      this.personService.getPersonByEmail(this.person.email).subscribe((objPerson)=>{
        this.person = objPerson.map((item) => {
          const personData = item.payload.doc.data();
          return {
            id: item.payload.doc.id,
            name: personData['name'],
            picture: personData['picture'],
            pictureName: personData['pictureName'],
            cover: personData['cover'],
            coverName: personData['coverName'],
            dateBirth: personData['dateBirth'],
            email: personData['email'],
            password: personData['password'],
            followers: personData['followers'],
            following: personData['following'],
            description: personData['description'],
          };
        })[0];
        this.auth.setUserLoged(this.person);
        this.appComp.getUserLoged();
        this.route.navigate(['/perfil/' + this.person.id]);
      });
    }).catch((error)=>{
      this.mensagem.addMensagem(error);
    });
  }

  takePicture(isFile : boolean, selectPic : number){
    let sourceType;
    
    if(isFile)
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    else 
      sourceType = this.camera.PictureSourceType.CAMERA;
    
    const options : CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((path) => {

      if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
        this.filePath.resolveNativePath(path).then((filePath) => {
          const directoryPath = filePath.substr(0, filePath.lastIndexOf('/'));
          const fileName = filePath.substr(filePath.lastIndexOf('/') + 1, filePath.length);
          this.copyLocalDirectory(directoryPath, fileName, this.createNameImage(), selectPic);
        });
      } else {
        const directoryPath = path.substr(0, path.lastIndexOf('/'));
        const fileName = path.substr(path.lastIndexOf('/') + 1, path.length);
        this.copyLocalDirectory(directoryPath, fileName, this.createNameImage(), selectPic);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  private copyLocalDirectory(path, fileName, newFileName, selectPic) {
      this.file.copyFile(path, fileName, this.file.dataDirectory, newFileName).then(() => {

      if(selectPic){
        this.params.profilePic = this.pathToImage(this.file.dataDirectory + newFileName);
        this.params.profilePicName = newFileName;
      } else {
        this.params.coverPic = this.pathToImage(this.file.dataDirectory + newFileName);
        this.params.coverPicName = newFileName;
      }

    }).catch((error) => {
      console.log(error);
    });
  }

  private pathToImage(pathImage){
      if(pathImage == null)
          return "";
      else
          return this.webView.convertFileSrc(pathImage);
  }

  private createNameImage(){
      const d = new Date();
      return (d.getTime() + '.jpg');
  }
}
