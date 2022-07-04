import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DipVigilancia } from 'src/app/pages/usuario/vigilancias/dipsvigilancias/models/dipvigilancias.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DipvigilanciasService {
  dipVigilanciasURL = environment.dipVigilanciasURL
  constructor(private readonly http : HttpClient) { }

  //agregar
  addVigilanciaDip( dip : DipVigilancia) : Observable<any> {
    return this.http.post<any>(`${this.dipVigilanciasURL}${'nuevo'}`,dip)
  }

  getVigilancias( paciente : string) : Observable<any> {
    return this.http.get<any>(`${this.dipVigilanciasURL}${paciente}`)
  }
}
