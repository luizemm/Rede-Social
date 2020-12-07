import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { File } from '@ionic-native/file/ngx';
import { post } from '../models/post.module';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore : AngularFirestore,
    private file : File) { }

  getListPost() {
    return this.firestore.collection('Post').snapshotChanges();
  }

  async addPost(post:post) {
    delete post.id
    post.isComment = false;
    try {
      if(post.media != ""){
        post.media = post.media.replace('http://localhost/', 'file://');
        const blobImage = await this.createBlobImageFile(post.media);
        post.media = await this.uploadImage(blobImage, post.mediaName);
      }
      await this.firestore.collection('Post').add({...post});
    } catch (error) {
      
    }
    
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

  likePost(idPerson: string, objPost: post){
    objPost.like.unshift(idPerson);
    this.updatePost(objPost);
  }

  unlikePost(idPerson: string, objPost: post){
    objPost.like.splice(objPost.like.indexOf(idPerson), 1);
    this.updatePost(objPost);
  }

  async updatePost(objPost: post){
    let idPost = objPost.id;
    delete objPost.id;
    await this.firestore.doc(`Post/${idPost}`).update(objPost);
  }

  getPostById(id:string) {
    return this.firestore.collection('Post').doc(id).ref.get().then((post)=>{
      if(post.exists){
        const postData = post.data();
        return {
          id: post.id,
          name: postData.name,
          idPerson: postData.idPerson,
          picture: postData.picture,
          time: postData.time,
          text: postData.text,
          like: postData.like,
          comments: postData.comments,
          isComment: postData.isComment,
          share: postData.share,
          mediaName: postData.mediaName,
          media: postData.media
        }
      }
    });
  }

  getPostByIdPerson(idPerson: String) {
    return this.firestore.collection('Post', ref => ref.where('idPerson', '==', idPerson)).snapshotChanges();
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
    console.log("blobimage: " + image);
    if(image){
      try {
        imageName = 'imagePosts/' + imageName;

        const uploadResult = await firebase.storage().ref().child(imageName).put(image);
        
        return uploadResult.ref.getDownloadURL();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
