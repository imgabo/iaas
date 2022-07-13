import { ApiPagination } from "src/app/shared/models/apiPagination.class";
import { ProcedimientoVigilancia } from "./procedimientos.interface";

export class procedimientoVigilanciasPagination extends ApiPagination {
  override items !: ProcedimientoVigilancia[];
}
