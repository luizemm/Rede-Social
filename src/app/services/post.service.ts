import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from '../models/person.model';
import { post } from '../models/post.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore : AngularFirestore) { }

  getListPost() {
    return this.firestore.collection('Post').snapshotChanges();
  }

  addPost(post:post) {
    delete post.id
    post.isComment = false;
    this.firestore.collection('Post').add({...post});
  }

  addComment(id:string, post:post){
    this.getPostById(id).then((post)=>{
      let objPost : post = post;
      delete post.id
      post.isComment = true;
      this.firestore.collection('Post').add({...post}).then((result)=>{
        objPost.comments.unshift(result.path.split('/')[1]);
        this.firestore.doc(`Post/${objPost.id}`).update(objPost);
      });
    });
  }

  getPostById(id:string) {
    return this.firestore.collection('Post').doc(id).ref.get().then((post)=>{
      if(post.exists){
        const postData = post.data();
        return {
          id: post.id,
          name: postData.name,
          email: postData.email,
          picture: postData.picture,
          time: postData.time,
          text: postData.text,
          like: postData.like,
          comments: postData.comments,
          isComment: postData.isComment,
          share: postData.share,
        }
      }
    });
  }

  // getPostByEmail(email: String): post[] {
  //   return this.getListPost().filter(x => x.email == email);
  // }
}
