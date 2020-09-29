export class post {
  id : Number;
  name : String;
  picture : String;
  time : String;
  text : String;
  like : Number;
  comments : Number[];
  isComment : Boolean;
  share : Number;

  constructor(){
    this.like = 0;
    this.comments = [];
    this.share = 0;
  }
}