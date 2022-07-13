import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { PacienteInterface } from '../pages/usuario/pacientes/models/paciente.interface';
import { PacientesService } from '../services/pacientes.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesResolver implements Resolve<PacienteInterface[]> {
  constructor (private readonly pacientesSVC : PacientesService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PacienteInterface[]> {
    return this.pacientesSVC.getPacientes(1 , 10).pipe(
      map(resp => resp),
      catchError(err => [])
    );
  }
}
