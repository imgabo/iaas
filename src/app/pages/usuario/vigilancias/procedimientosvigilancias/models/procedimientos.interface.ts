import { ProcedimientosCirugia } from "src/app/pages/admin/procedimientos-cirugias/models/procedimientos-cirugias.interface";
import { TipoHeridas } from "src/app/pages/admin/tipo-heridas/models/tipo-heridas.interface";
import { PacienteInterface } from "../../../pacientes/models/paciente.interface";

export interface ProcedimientoVigilancia {
  id : string,
  procedimiento : ProcedimientosCirugia,
  fecha_operacion : string,
  fecha_revision : string,
  herida : TipoHeridas,
  asa : string,
  fecha_alta : string,
  control_post : boolean,
  fecha_control : string,
  antibioprofilaxis : boolean,
  observacion : string,
  paciente : PacienteInterface,
  usuarioCreacion : string


}
