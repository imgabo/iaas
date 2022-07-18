import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { nuevoComentarioIarepis } from 'src/app/pages/usuario/vigilancias/iarepisvigilancias/models/comentarioiarepisvigilancias.interface';
import { IarepisVigilancia } from 'src/app/pages/usuario/vigilancias/iarepisvigilancias/models/iarepisVigilancias.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IarepisvigilanciasService {
  iarepisVigilanciasURL = environment.iarepisVigilanciasURL;
  comentarioIarepisURL = environment.comentarioIarepisURL;
  constructor(private readonly http : HttpClient) { }

  //agregar
  addIarepisVigilancia(iarepis : IarepisVigilancia) :Observable<any> {
    return this.http.post<any>(`${this.iarepisVigilanciasURL}${'nuevo'}`, iarepis)
  }


   // comentarios

   agregarComentario(comentario : nuevoComentarioIarepis) : Observable<any> {
    return this.http.post<any>(`${this.comentarioIarepisURL}${'nuevo'}`, comentario)
  }


  getComentarios( id : string) : Observable<any> {
    return this.http.get<any>(`${this.comentarioIarepisURL}${id}`)
  }
}
