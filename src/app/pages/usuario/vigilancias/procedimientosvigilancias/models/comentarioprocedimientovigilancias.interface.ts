import { User } from "src/app/pages/admin/userlist/models/user.interface";




export interface nuevoComentarioVigilanciaProcedimiento {
  id : string;
  contenido : string;
  createdAt : string ;
  id_procedimiento : string ;
  created_by : User;
}
