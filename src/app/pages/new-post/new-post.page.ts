import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PostService } from 'src/app/services/post.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  person : Person;
  post : post = new post();

  constructor(private postService : PostService,
     private route : Router,
     private auth: AuthGuardService,
     private mensagemService: MensagensService,
     private camera: Camera)
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
    this.post.name = this.person.name;
    this.post.idPerson = this.person.id;
    this.post.picture = this.person.picture;
    this.post.time = Date.now();
    this.postService.addPost(this.post);
    this.post = new post();
    this.route.navigate(['/home']);
  }

  takePicture(){

    const options : CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then();
  }

}
