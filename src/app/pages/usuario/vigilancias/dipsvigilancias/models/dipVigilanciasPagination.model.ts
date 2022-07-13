import { ApiPagination } from "src/app/shared/models/apiPagination.class";
import { DipVigilancia } from "./dipvigilancias.interface";

export class dipVigilanciasPagination extends ApiPagination {
  override items !: DipVigilancia[];
}
