import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    return this.getPostById(id).then((dbPost)=>{
      let objPost : post = dbPost;
      delete post.id;
      delete objPost.id;
      post.isComment = true;
      this.firestore.collection('Post').add({...post}).then((result)=>{
        objPost.comments.unshift(result.path.split('/')[1]);
        this.firestore.doc(`Post/${id}`).update(objPost);
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

  getPostByEmail(email: String) {
    return this.firestore.collection('Post', ref => ref.where('email', '==', email)).snapshotChanges();
  }
}
