import { PAAS } from "src/app/pages/admin/paas/models/paas.interface";
import { User } from "src/app/pages/admin/userlist/models/user.interface";
import { PacienteInterface } from "../../../pacientes/models/paciente.interface";


export interface PaasVigilancia {
    id : string;
    dias : number;
    n_procedimiento : string;
    fecha_vigilancia : string;
    observaciones : string;
    paciente : PacienteInterface;
    paas : PAAS;
    usuarioCreacion : User;
}
