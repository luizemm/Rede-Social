import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PostService } from 'src/app/services/post.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  person : Person;
  post : post = new post();
  imagemSelecionada : string = "";
  hasImage : boolean = false;

  constructor(private postService : PostService,
     private route : Router,
     private auth: AuthGuardService,
     private mensagemService: MensagensService,
     private camera: Camera,
     private file: File,
     private webView: WebView,
     private platform : Platform,
     private filePath : FilePath
     )
  { 
    try {
      this.person = this.auth.getUserLoged();
    } catch (error) {
      this.mensagemService.addMensagem(error);
    }
  }

  ngOnInit() {
    
  }

  onSubmit(){
    if (this.hasImage) {
      this.post.media = this.imagemSelecionada;
      this.post.mediaName = this.imagemSelecionada.substr(this.imagemSelecionada.lastIndexOf('/') + 1, this.imagemSelecionada.length);
    } else{
      this.post.media = "";
      this.post.mediaName = "";
    }
    this.post.name = this.person.name;
    this.post.idPerson = this.person.id;
    this.post.picture = this.person.picture;
    this.post.time = Date.now();
    this.postService.addPost(this.post);
    this.post = new post();
    this.route.navigate(['/home']);
  }

  removeImage(){
    this.imagemSelecionada = "";
    this.hasImage = false;
  }

  takePicture(isFile : boolean){
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
          this.copyLocalDirectory(directoryPath, fileName, this.createNameImage());
        });
      } else {
        const directoryPath = path.substr(0, path.lastIndexOf('/'));
        const fileName = path.substr(path.lastIndexOf('/') + 1, path.length);
        this.copyLocalDirectory(directoryPath, fileName, this.createNameImage());
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  private copyLocalDirectory(path, fileName, newFileName) {
      this.file.copyFile(path, fileName, this.file.dataDirectory, newFileName).then(() => {

      this.imagemSelecionada = this.pathToImage(this.file.dataDirectory + newFileName);
      console.log('imagemSelecionada: ' + this.imagemSelecionada);
      this.hasImage = true;

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
