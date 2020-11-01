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
    if(this.isStringEmpty(email) || this.isStringEmpty(password))
      return callback.errorFunction("Erro: Email ou senha inválida");
    
    this.personService.getPersonByEmailGet(email).subscribe(
      (objPerson)=>{
        let person;
        objPerson.docs.forEach((item) => {
          person = item.data();
          person.id = item.id;
        });
      
        if (person != null) {
          if (person.password === password){
            this.userLoged = person;
            return callback.successFunction();
          }
          else
            return callback.errorFunction("Erro: Email ou senha inválida");
        }
        else
          return callback.errorFunction("Erro: Email ou senha inválida");
      }
    );
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

  setUserLoged(objPerson : Person){
    this.userLoged = objPerson;
  }

  private isStringEmpty(string: String): boolean {
    if (string == '' || string == null)
      return true;

    return false;
  }
}
