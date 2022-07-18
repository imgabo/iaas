import { ApiPagination } from "src/app/shared/models/apiPagination.class";
import { IarepisVigilancia } from "./iarepisVigilancias.interface";



export class iarepisVigilanciaPagination extends ApiPagination {
  override items !: IarepisVigilancia[]
}
