import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { nuevoComentarioVigilanciaPaas } from 'src/app/pages/usuario/vigilancias/paavigilancias/models/comentariopaasvigilancias.interface';
import { PaasVigilancia } from 'src/app/pages/usuario/vigilancias/paavigilancias/models/paasvigilancia.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaasvigilanciasService {
  paasVigilanciasURL = environment.paasVigilanciasURL;
  comentarioPaasURL = environment.comentarioPaasURL;
  constructor(private readonly http : HttpClient) { }

    //agregar
  addPaasVigilancia( paas : PaasVigilancia): Observable<any>{
    return this.http.post<any>(`${this.paasVigilanciasURL}${'nuevo'}`, paas)
  }

  agregarComentario(comentario : nuevoComentarioVigilanciaPaas) : Observable<any> {
    return this.http.post<any>(`${this.comentarioPaasURL}${'nuevo'}`, comentario)
  }


  getComentarios( id : string) : Observable<any> {
    return this.http.get<any>(`${this.comentarioPaasURL}${id}`)
  }

}
