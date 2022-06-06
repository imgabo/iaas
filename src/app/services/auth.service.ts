import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {HttpClient } from '@angular/common/http'
import { loginUsuario } from '@auth/models/login-usuario.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { NuevoUsario } from '@auth/models/registro-usuario.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = environment.authUrl;
  constructor(private httpClient: HttpClient) { }

  login(user : loginUsuario): Observable<any> {
    
    return this.httpClient.post<any>(this.authURL + 'login' , user);
  }


  registro(user : NuevoUsario): Observable<any> {
    
    return this.httpClient.post<any>(this.authURL + 'nuevo' , user);
  }
}
