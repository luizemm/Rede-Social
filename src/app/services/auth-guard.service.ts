import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
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

  signIn(email: String, password: String) {
    let person = this.personService.getPersonByEmail(email);

    if (person) {
      if (person.password === password)
        this.userLoged = person;
      else
        throw new Error("Invalid email or password.");
    }
    else
      throw new Error("Invalid email or password.");
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
