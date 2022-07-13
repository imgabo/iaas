import { ApiPagination } from "src/app/shared/models/apiPagination.class";
import { PacienteInterface } from "./paciente.interface";

export class PacientesPagination extends ApiPagination {
  override items !: PacienteInterface[];
}
