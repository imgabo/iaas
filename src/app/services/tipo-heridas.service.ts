import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoHeridas } from '../pages/admin/tipo-heridas/models/tipo-heridas.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoHeridasService {
  tipoHeridasURL = environment.tipoHeridasURL;

  constructor(private readonly http : HttpClient) { }

    //obtener todos

    getProcedimientos() : Observable<any> {
      return this.http.get<any>(this.tipoHeridasURL);
    }
    
    //agregar procedimiento
    addProcedimiento(tipoHerida : TipoHeridas) : Observable<any> {
      return this.http.post<any>(`${this.tipoHeridasURL}${'nuevo'}`, tipoHerida)
    }
  
    //updatear procedimiento
    updateProcedimiento(id : string, tipoHerida : TipoHeridas): Observable<any>{
      return this.http.put<any>(`${this.tipoHeridasURL}${id}`, tipoHerida);
    }
  
    //eliminar procedimiento
    deleteProcedimiento( id : string) : Observable<any> {
      return this.http.delete<any>(`${this.tipoHeridasURL}${id}`)
    }
  
}
