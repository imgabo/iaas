import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcedimientosCirugia } from '../pages/admin/procedimientos-cirugias/models/procedimientos-cirugias.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoCirugiasService {
  procedimientosCirugiasURL = environment.procedimientosCirugiasURL;
  constructor(private readonly http : HttpClient) { }

  //obtener todos

  getProcedimientos() : Observable<any> {
    return this.http.get<any>(this.procedimientosCirugiasURL);
  }
  
  //agregar procedimiento
  addProcedimiento(procedimiento : ProcedimientosCirugia) : Observable<any> {
    return this.http.post<any>(`${this.procedimientosCirugiasURL}${'nuevo'}`, procedimiento)
  }

  //updatear procedimiento
  updateProcedimiento(id : string, procedimiento : ProcedimientosCirugia): Observable<any>{
    return this.http.put<any>(`${this.procedimientosCirugiasURL}${id}`, procedimiento);
  }

  //eliminar procedimiento
  deleteProcedimiento( id : string) : Observable<any> {
    return this.http.delete<any>(`${this.procedimientosCirugiasURL}${id}`)
  }
}
