import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAREPIS } from '../pages/admin/iarepis/models/iarepis.interface';

@Injectable({
  providedIn: 'root'
})
export class IarepisService {
  iarepisURL = environment.iarepisURL;

  constructor(private readonly http : HttpClient) { }


  //obtener todos
  getIarepis() : Observable<any> {
    return this.http.get<any>(this.iarepisURL);
  }
  
  //agregar iarepis
  addIarepis(iarepis : IAREPIS) : Observable<any> {
    return this.http.post<any>(`${this.iarepisURL}${'nuevo'}`, iarepis)
  }

  //updatear iarepis
  updateIarepis(id : string, iarepis : IAREPIS): Observable<any>{
    return this.http.put<any>(`${this.iarepisURL}${id}`, iarepis);
  }

  //eliminar iarepis
  deleteIarepis( id : string) : Observable<any> {
    return this.http.delete<any>(`${this.iarepisURL}${id}`)
  }
  
}
