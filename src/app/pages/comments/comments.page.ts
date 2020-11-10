import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { post } from 'src/app/models/post.module';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PersonService } from 'src/app/services/person.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  post : post;
  person : Person;
  listPost : post[] = [];
  comment : post = new post();

  constructor(private postService : PostService,
    private personService : PersonService,
    private route : ActivatedRoute,
    private auth: AuthGuardService,
    private mensagemService: MensagensService) 
  {
    this.postService.getPostById(this.route.snapshot.paramMap.get('id')).then((objPost)=>{
      this.post = objPost;
      
      for(let comment of this.post.comments){
        postService.getPostById(comment).then((objPost)=>{
          this.listPost.push(objPost);
        })
      }
    });
    
    try {
      this.person = this.auth.getUserLoged();
    } catch (error) {
      this.mensagemService.addMensagem(error);
    }
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.comment.name = this.person.name;
    this.comment.idPerson = this.person.id;
    this.comment.picture = this.person.picture;
    this.comment.time = '1h';
    this.postService.addComment(this.post.id, this.comment).then(()=>{
      this.postService.getPostById(this.post.id).then((parentPost)=>{
        this.post = parentPost;
        this.postService.getPostById(this.post.comments[0]).then((childpost)=>{
          this.listPost.unshift(childpost);
        });
      });
    });

    this.comment = new post();
  }
}
