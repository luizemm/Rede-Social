export class Person {
    id: String;
    name : String;
    picture : String;
    cover: String;
    dateBirth : String;
    email : String;
    password : String;
    followers: String[];
    following: String[];
    description: String;

 constructor(){
    this.followers = [];
    this.following = [];
 }
}