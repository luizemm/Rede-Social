import { Pipe, PipeTransform } from '@angular/core';
import { dateMilisec } from '../utils/date-milisec';

@Pipe({
  name: 'lifeTimePost'
})
export class LifeTimePostPipe implements PipeTransform {

  transform(time: number): string {
    let lifeTimeMilisec = Date.now() - time;

    if(lifeTimeMilisec < dateMilisec.MIN){
      return "Agora";
    } else if(lifeTimeMilisec < dateMilisec.HOUR){
      return this.converteNumero(lifeTimeMilisec, "min") + "m";
    } else if(lifeTimeMilisec < dateMilisec.DAY){
      return this.converteNumero(lifeTimeMilisec, "hour") + "h";
    } else if(lifeTimeMilisec < dateMilisec.MONTH){
      return this.converteNumero(lifeTimeMilisec, "day") + "d";
    } else {
      return "teste";
    }
  }

  converteNumero(valor: number, tempo : string){
    switch(tempo){
      case "min":
        return Math.trunc(valor/(1000 * 60));
      case "hour":
        return Math.trunc(valor/(1000 * 60 * 60));
      case "day":
        return Math.trunc(valor/(1000 * 60 * 60 * 24));
    }
  }

}
