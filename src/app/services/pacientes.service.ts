import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicios } from '../pages/admin/servicios/models/servicio.interface';
import { PacienteInterface } from '../pages/usuario/pacientes/models/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  pacientesURL = environment.pacientesURL;
  constructor(private readonly http : HttpClient) { }

  //obtener pacientes
  getPacientes() : Observable<any> {
    return this.http.get<any>(this.pacientesURL);
  }

  //crear paciente 
  create(paciente : PacienteInterface):Observable<any>{

    return this.http.post<any>(`${this.pacientesURL}${'nuevo'}`,paciente);
  }
}
