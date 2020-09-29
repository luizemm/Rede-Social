export class post {
  id : Number;
  name : String;
  picture : String;
  time : String;
  text : String;
  like : Number;
  comment : Number;
  share : Number;

  constructor(){
    this.like = 0;
    this.comment = 0;
    this.share = 0;
  }
}