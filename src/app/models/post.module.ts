export class post {
  id : string;
  name : String;
  idPerson : String;
  picture : String;
  time : number;
  text : String;
  like : string[];
  comments : string[];
  isComment : Boolean;
  share : Number;
  mediaName : string;
  media : string

  constructor(){
    this.like = [];
    this.comments = [];
    this.share = 0;
  }
}