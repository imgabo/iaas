import { User } from "src/app/pages/admin/userlist/models/user.interface";




export interface nuevoComentaripVigilanciaDIP {
  id : string;
  contenido : string;
  createdAt : string ;
  id_dip : string ;
  created_by : User;
}
