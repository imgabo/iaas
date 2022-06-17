import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dip } from '../pages/admin/dip/models/dip.interface';

@Injectable({
  providedIn: 'root'
})
export class DipService {
  dipUrl = environment.dipURL;


  constructor(private readonly http : HttpClient) { }

  //obtener
  getDips() : Observable<any> {
    return this.http.get(this.dipUrl);
  }

  //agregar
  addDip ( dip : Dip ) :Observable<any> {

    return this.http.post<any>(`${this.dipUrl}${'nuevo'}`, dip)
  }

  //updatear
  updateDip(id : string, dip : Dip): Observable<any>{
    return this.http.put<any>(`${this.dipUrl}${id}`, dip);
  }

  // delete
  deleteDip( id : string) : Observable<any> {
    return this.http.delete<any>(`${this.dipUrl}${id}`);
  }

}
