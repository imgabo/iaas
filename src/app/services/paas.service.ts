import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PAAS } from '../pages/admin/paas/models/paas.interface';

@Injectable({
  providedIn: 'root'
})
export class PaasService {
  
  paasURL = environment.paasURL;
  
  constructor(private readonly http : HttpClient) { }

  //obtener todos
  getPaas() : Observable<any> {
    return this.http.get<any>(this.paasURL);
  }
  
  //agregar paas
  addPaas(paas : PAAS) : Observable<any> {
    return this.http.post<any>(`${this.paasURL}${'nuevo'}`, paas)
  }

  //updatear paas
  updatePaas(id : string, paas : PAAS): Observable<any>{
    return this.http.put<any>(`${this.paasURL}${id}`, paas);
  }

  //eliminar paas
  deletePaas( id : string) : Observable<any> {
    return this.http.delete<any>(`${this.paasURL}${id}`)
  }



}
