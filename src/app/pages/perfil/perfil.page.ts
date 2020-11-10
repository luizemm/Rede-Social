import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PersonService } from 'src/app/services/person.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit{

  person: Person = new Person();
  isMyProfile: boolean;
  posts: post[];

  constructor(
    private auth: AuthGuardService,
    private postService: PostService,
    private personService: PersonService,
    private route: ActivatedRoute
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
        dateBirth : auxPerson.dateBirth,
        email : auxPerson.email,
        password : auxPerson.password,
        followers: auxPerson.followers,
        following: auxPerson.following,
        description: auxPerson.description,
      }
      if(this.auth.getUserLoged().id === this.person.id){
        this.isMyProfile = true;
      } else {
        this.isMyProfile = false;
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
}
