import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicios } from '../pages/admin/servicios/models/servicio.interface';
import { PacienteInterface } from '../pages/usuario/pacientes/models/paciente.interface';
import { NuevoComentarioPaciente } from '../pages/usuario/vigilancias/comentarios/models/comentariopacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  pacientesURL = environment.pacientesURL;
  constructor(private readonly http : HttpClient) { }

  //obtener pacientes
  getPacientes(page : number , limit : number) : Observable<any> {
    return this.http.get<any>(`${this.pacientesURL}`, {params : {page: page, limit : limit}});
  }

  //obtener paciente por id
  getPaciente(id : string) : Observable<any> {
    return this.http.get<any>(`${this.pacientesURL}${id}`);
  }

  //crear paciente
  create(paciente : PacienteInterface):Observable<any>{

    return this.http.post<any>(`${this.pacientesURL}${'nuevo'}`,paciente);
  }

  getDips(id : string, page : number , limit : number) : Observable<any>{
    return this.http.get<any>(`${this.pacientesURL+'vigilancias-dips/'}${id}`, {params : {page: page, limit : limit}})
  }

  getProcedimientos(id : string , page : number , limit : number ) : Observable<any> {
    return this.http.get<any>(`${this.pacientesURL+'vigilancias-procedimientos/'}${id}`, {params: {page : page, limit : limit}});
  }

  getIarepis(id : string, page : number , limit : number) : Observable<any> {
    return this.http.get<any>(`${this.pacientesURL+'vigilancias-iarepis/'}${id}`, {params: {page : page, limit : limit}})
  }

  getPaas(id : string, page : number , limit : number) : Observable<any> {
    return this.http.get<any>(`${this.pacientesURL+'vigilancias-paas/'}${id}`, {params: {page : page, limit : limit}})
  }

  addComentario(comentario : NuevoComentarioPaciente):Observable<any>{
    return this.http.post<any>(`${this.pacientesURL}${'comentarios/nuevo'}`,comentario)
  }

  getComentarios(id : string):Observable<any>{
    return this.http.get<any>(`${this.pacientesURL}${'comentarios/'+id}`)
  }
}
