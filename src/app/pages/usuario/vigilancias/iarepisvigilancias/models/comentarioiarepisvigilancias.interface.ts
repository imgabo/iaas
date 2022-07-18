import { User } from "src/app/pages/admin/userlist/models/user.interface";

export interface nuevoComentarioIarepis {
  id : string;
  contenido : string;
  createdAt : string ;
  id_vigilancia_iarepis : string ;
  created_by : User;


}
