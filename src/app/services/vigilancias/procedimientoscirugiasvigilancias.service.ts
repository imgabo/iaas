import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { nuevoComentarioVigilanciaProcedimiento } from 'src/app/pages/usuario/vigilancias/procedimientosvigilancias/models/comentarioprocedimientovigilancias.interface';
import { ProcedimientoVigilancia } from 'src/app/pages/usuario/vigilancias/procedimientosvigilancias/models/procedimientos.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VigilanciasProcedimientoscirugiasService {
  procedimientosVigilanciasURL = environment.procedimientosVigilanciasURL;
  comentarioProcedimientoURL = environment.comentarioProcedimientosURL;
  constructor(private readonly http : HttpClient) { }


  //agregar
  addProcedimientoVigilancia(procedimiento : ProcedimientoVigilancia) : Observable<any> {
    return this.http.post<any>(`${this.procedimientosVigilanciasURL}${'nuevo'}`, procedimiento)
  }


  // comentarios

  agregarComentario(comentario : nuevoComentarioVigilanciaProcedimiento) : Observable<any> {
    return this.http.post<any>(`${this.comentarioProcedimientoURL}${'nuevo'}`, comentario)
  }


  getComentarios( id : string) : Observable<any> {
    return this.http.get<any>(`${this.comentarioProcedimientoURL}${id}`)
  }


}
