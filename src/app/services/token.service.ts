import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor() { }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  isLogged():boolean {
    if(this.getToken()){
      return true;
    }
    return false;
  }


  setToken(token:string): void {
    this.loggedIn.next(true);
    localStorage.setItem('token', token);
  }


  getToken(): string {
    return  localStorage.getItem('token')!;
  }

  getNombreUsuario(): string{
    if(!this.isLogged){
      return '';
    }
    const token = this.getToken();
    const payload =token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombreUsuario = valuesJson.nombreUsuario;
    return nombreUsuario;

  }

  logOut() :void {
    localStorage.clear();
  }


}
