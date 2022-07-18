import { IAREPIS } from "src/app/pages/admin/iarepis/models/iarepis.interface";
import { User } from "src/app/pages/admin/userlist/models/user.interface";
import { PacienteInterface } from "../../../pacientes/models/paciente.interface";

export interface IarepisVigilancia {
  id : string;
  paciente : PacienteInterface;
  iarepis : IAREPIS;
  fecha_cultivo : string;
  fecha_aviso_lab : string;
  fecha_vigilancia : string;
  observaciones : string
  usuarioCreacion : User;
}
