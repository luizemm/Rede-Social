import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PersonService } from 'src/app/services/person.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit{

  person: Person = new Person();
  userLoged: Person;
  isMyProfile: boolean;
  isFollowing: boolean;
  posts: post[];

  constructor(
    private auth: AuthGuardService,
    private postService: PostService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private mensagemService: MensagensService
  ) {
    this.getData();
  }

  getData(){
  this.personService.getPersonById(this.route.snapshot.paramMap.get('id')).then((objPerson) => {
    if(objPerson.exists){
      const auxPerson = objPerson.data();
      this.person = {
        id: objPerson.id,
        name : auxPerson.name,
        picture : auxPerson.picture,
        cover: auxPerson.cover,
        pictureName : auxPerson.pictureName,
        coverName: auxPerson.coverName,
        dateBirth : auxPerson.dateBirth,
        email : auxPerson.email,
        password : auxPerson.password,
        followers: auxPerson.followers,
        following: auxPerson.following,
        description: auxPerson.description,
      }

      this.userLoged = this.auth.getUserLoged();

      if(this.userLoged.id !== this.person.id){
        this.isMyProfile = false;
        this.isFollowing = this.userLoged.following.includes(this.person.id);
      } else {
        this.isMyProfile = true;
      }

      this.postService.getPostByIdPerson(this.person.id).subscribe((myPosts)=>{
        this.posts = myPosts.map((item)=>{
          const postData = item.payload.doc.data();
          return {
            id: item.payload.doc.id,
            name: postData['name'],
            idPerson: postData['idPerson'],
            picture: postData['picture'],
            time: postData['time'],
            text: postData['text'],
            like: postData['like'],
            comments: postData['comments'],
            isComment: postData['isComment'],
            share: postData['share'],
            media: postData['media'],
            mediaName: postData['mediaName'],
          }
        });
      });
    }
  });
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getData();
  }

  follow(){
    this.userLoged.following.push(this.person.id);
    this.person.followers.push(this.userLoged.id);
    this.personService.updateFollower({...this.userLoged}).then(() => {
      this.personService.updateFollower({...this.person}).then(() => {
        this.isFollowing = true;
        this.auth.setUserLoged(this.userLoged);
      }).catch((erro) => {
        console.log(erro);
      });
    }).catch((erro) => {
      console.log(erro);
    });
  }

  unfollow() {
    let indexfollowing = this.userLoged.following.indexOf(this.person.id);
    let indexFollower = this.person.followers.indexOf(this.userLoged.id);

    this.userLoged.following.splice(indexfollowing);
    this.person.followers.splice(indexFollower);
    this.personService.updateFollower({...this.userLoged}).then(() => {
      this.personService.updateFollower({...this.person}).then(() => {
        this.isFollowing = false;
        this.auth.setUserLoged(this.userLoged);
      }).catch((erro) => {
        console.log(erro);
      });
    }).catch((erro) => {
      console.log(erro);
    });
  }
}
