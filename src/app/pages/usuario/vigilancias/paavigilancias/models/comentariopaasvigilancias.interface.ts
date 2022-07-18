import { User } from "src/app/pages/admin/userlist/models/user.interface";


export interface nuevoComentarioVigilanciaPaas {

  id : string;
  contenido : string;
  createdAt : string;
  id_vigilancia_paas : string;
  created_by : User;

}
