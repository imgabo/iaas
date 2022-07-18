import { User } from "src/app/pages/admin/userlist/models/user.interface";


export interface NuevoComentarioPaciente {
  id : string;
  contenido : string;
  createdAt : string ;
  id_paciente : string ;
  created_by : User;
}
