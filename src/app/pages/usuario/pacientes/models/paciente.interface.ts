import { Servicios } from "src/app/pages/admin/servicios/models/servicio.interface";

export interface PacienteInterface {
    id : string,
    nombre : string,
    rut : string,
    segundo_nombre : string,
    apellido_paterno : string,
    apellido_materno : string,
    edad : string,
    fecha_nacimiento : string,
    sexo : string,
    fecha_hospitalizacion : string,
    servicioIngreso : Servicios,
    servicioActual : Servicios

}
