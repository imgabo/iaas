import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  isLogged():boolean {
    if(this.getToken()){
      return true;
    }
    return false;
  }


  setToken(token:string): void {
    localStorage.setItem('token', token);
  }


  getToken(): string {
    return  localStorage.getItem('token')!;
  }

  getUser() : string {
    if(!this.isLogged){
      return '';
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    return valuesJson;
  }

  getId() : string {
    if(!this.isLogged){
      return '';
    }
    const token = this.getToken();
    const payload =token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const id = valuesJson.id;

    return id;
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
