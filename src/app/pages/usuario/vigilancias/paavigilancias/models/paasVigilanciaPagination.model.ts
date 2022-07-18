import { ApiPagination } from "src/app/shared/models/apiPagination.class";
import { PaasVigilancia } from "./paasvigilancia.interface";


export class paasVigilanciaPagination extends ApiPagination {

    override items !: PaasVigilancia[];
}
