import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FactorRiesgo } from '../pages/admin/factores-riesgo/models/factores-riesgo.interface';

@Injectable({
  providedIn: 'root'
})
export class FactoresRiesgoService {
  factoresRiesgosURL = environment.factoresRiesgosURL
  constructor(private readonly http : HttpClient) { }

  // Obtenemos todos los factores 
  getFactoresRiesgos(): Observable<any>{
    return this.http.get(this.factoresRiesgosURL);
  }

  //agregar un nuevo factor de riesgo
  addFactorRiesgo(factor : FactorRiesgo): Observable<any> {
    return this.http.post<any>(this.factoresRiesgosURL + 'nuevo', factor);
  }

  //borrar factor de riesgo
  deleteFactorRiesgo(factor : FactorRiesgo): Observable<any> {
    return this.http.post(this.factoresRiesgosURL +'delete', factor);
  }

  //updatear factor de riesgo()

}
