import { Dip } from "src/app/pages/admin/dip/models/dip.interface";
import { User } from "src/app/pages/admin/userlist/models/user.interface";
import { PacienteInterface } from "src/app/pages/usuario/pacientes/models/paciente.interface";


export interface DipVigilancia  {
  id : string;
  fecha_instalacion : string ;
  fecha_retiro : string;
  paciente : PacienteInterface;
  dip : Dip;
  usuarioCreacion : number;
  usuarioRetira : number;

}
