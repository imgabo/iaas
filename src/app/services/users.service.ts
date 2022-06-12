import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../pages/admin/userlist/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  statusUrl = environment.statusUrl;
  constructor(private http: HttpClient) { }



  getUsuarios() : Observable<any> {

    return this.http.get(this.statusUrl);
  }

  getStatus(user : User) : Observable<any> {
    return this.http.get(this.statusUrl);
  }


  setStatus(user : string, body : any) : Observable<any> {
  
    return this.http.patch<any>(this.statusUrl + user, body);
  }
}
