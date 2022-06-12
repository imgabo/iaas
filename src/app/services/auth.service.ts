import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginUsuario } from '../pages/auth/models/login-usuario.interface';
import { NuevoUsario } from '../pages/auth/models/registro-usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = environment.authUrl;
  constructor(private httpClient: HttpClient) { }

  login(user : loginUsuario) : Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login' , user);
  }


  registro(user : NuevoUsario): Observable<any> {
    
    return this.httpClient.post<any>(this.authURL + 'nuevo' , user);
  }
}
