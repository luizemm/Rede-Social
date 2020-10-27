export class post {
  id : string;
  name : String;
  email : String;
  picture : String;
  time : String;
  text : String;
  like : Number;
  comments : string[];
  isComment : Boolean;
  share : Number;

  constructor(){
    this.like = 0;
    this.comments = [];
    this.share = 0;
  }
}