import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  constructor(
    private personService: PersonService,
    private router: Router,
    private fireAuth: AngularFireAuth) { }

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

    this.fireAuth.signInWithEmailAndPassword(email.toString(), password.toString()).then((person) => {
      this.personService.getPersonById(person.user.uid).then((user) => {
        let person;
        if(user.exists){
          person = user.data();
          person.id = user.id;
        }
        if(person != null){
          this.userLoged = person;
          return callback.successFunction();
        } else {
          return callback.errorFunction("Erro inesperado!");
        }
      }).catch((erro) => {
        console.log(erro);
        return callback.errorFunction("Erro inesperado!");
      });
    }).catch(() => {
      return callback.errorFunction("Erro: Email ou senha inválida");
    });
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      this.userLoged = null;
      this.router.navigate(['/login']);
    });
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
