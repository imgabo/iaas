import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicios } from '../pages/admin/servicios/models/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  serviciosUrl = environment.servicioURL;
  constructor(private readonly http:  HttpClient) { }

  // Obtenemos todos los servicios ordenados por id 
  getServicios() : Observable<any> {
    return this.http.get(this.serviciosUrl);
  }


  addServicio(servicio : Servicios): Observable<any> {
   
    return this.http.post<any>(this.serviciosUrl + 'nuevo', servicio);
  }

  updateServicios() {

  }



  deleteServicios(servicio : Servicios): Observable<any> {
    return this.http.post(this.serviciosUrl + 'delete', servicio);
  }


}
