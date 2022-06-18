import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Localizacion } from '../pages/admin/localizaciones/models/lozalizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {
  localizacionesURL = environment.localizacionesURL;
  constructor(private readonly http : HttpClient) { }

 //obtener todos

 getLocalizaciones() : Observable<any> {
  return this.http.get<any>(this.localizacionesURL);
}

//agregar localizacion
addLocalizaciones(localizacion :  Localizacion) : Observable<any> {
  return this.http.post<any>(`${this.localizacionesURL}${'nuevo'}`, localizacion)
}

//updatear localizacion
updateLocalizaciones(id : string, localizacion :  Localizacion): Observable<any>{
  return this.http.put<any>(`${this.localizacionesURL}${id}`, localizacion);
}

//eliminar localizacion
deleteLocalizaciones( id : string) : Observable<any> {
  return this.http.delete<any>(`${this.localizacionesURL}${id}`)
}


}
