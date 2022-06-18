import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Microorganismos } from '../pages/admin/microorganismos/models/microorganismos.interface';

@Injectable({
  providedIn: 'root'
})
export class MicroorganismosService {
  microorganismosURL = environment.microorganismosURL;
  constructor(private readonly http : HttpClient) { }

    //obtener todos
    getMicroorganismos() : Observable<any> {
      return this.http.get<any>(this.microorganismosURL);
    }
    
    //agregar microorganismo
    addMigroorganismo(microorganismo : Microorganismos) : Observable<any> {
      return this.http.post<any>(`${this.microorganismosURL}${'nuevo'}`, microorganismo)
    }
  
    //updatear microorganismo
    updateMicrooganismo(id : string, microorganismo : Microorganismos): Observable<any>{
      return this.http.put<any>(`${this.microorganismosURL}${id}`, microorganismo);
    }
  
    //eliminar microorganismo
    deleteMicroorganismo( id : string) : Observable<any> {
      return this.http.delete<any>(`${this.microorganismosURL}${id}`)
    }


}
