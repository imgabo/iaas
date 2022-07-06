import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { nuevoComentaripVigilanciaDIP } from 'src/app/pages/usuario/vigilancias/dipsvigilancias/models/comentariodipvigilancias.interface';
import { DipVigilancia } from 'src/app/pages/usuario/vigilancias/dipsvigilancias/models/dipvigilancias.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DipvigilanciasService {
  dipVigilanciasURL = environment.dipVigilanciasURL;
  comentarioDipURL = environment.comentarioDipURL;
  constructor(private readonly http : HttpClient) { }

  //agregar
  addVigilanciaDip( dip : DipVigilancia) : Observable<any> {
    return this.http.post<any>(`${this.dipVigilanciasURL}${'nuevo'}`,dip)
  }
  // obtener
  getVigilancias( paciente : string) : Observable<any> {
    return this.http.get<any>(`${this.dipVigilanciasURL}${paciente}`)
  }

  agregarComentario( comentario : nuevoComentaripVigilanciaDIP) : Observable<any> {
    return this.http.post<any>(`${this.comentarioDipURL}${'nuevo'}`,comentario);
  }

  obtenerComentarios( dip : string ) : Observable<any>{
    return this.http.get<any>(`${this.comentarioDipURL}${dip}`)
  }
}
