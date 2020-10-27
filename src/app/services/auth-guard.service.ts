import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { Callback } from '../Utils/callback';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private userLoged: Person = null;

  constructor(private personService: PersonService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.userLoged) {
        this.router.navigate(["login"]);
        return false;
    }

    return true;
  }

  signIn(email: String, password: String, callback : Callback){
    return this.personService.getPersonByEmail(email).subscribe((objPerson)=>{
      let person = objPerson.map((item) => {
        const personData = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          name: personData['name'],
          picture: personData['picture'],
          cover: personData['cover'],
          dateBirth: personData['dateBirth'],
          email: personData['email'],
          password: personData['password'],
          followers: personData['followers'],
          following: personData['following'],
          description: personData['description'],
        };
      });
      
      if (person.length > 0) {
        if (person[0].password === password){
          this.userLoged = person[0];
          callback.successFunction();
        }
        else
          callback.errorFunction("Erro: Email ou senha inválida");
      }
      else
        callback.errorFunction("Erro: Email ou senha inválida");
    });
  }

  signOut() {
    this.userLoged = null;
  }

  getUserLoged(): Person {
    if (!this.userLoged) {
      throw new Error("User is not loged.");
    }
    return this.userLoged;
  }
}
