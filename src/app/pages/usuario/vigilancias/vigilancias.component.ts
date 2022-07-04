import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TokenService } from 'src/app/services/token.service';
import { PacienteInterface } from '../pacientes/models/paciente.interface';

@Component({
  selector: 'app-vigilancias',
  templateUrl: './vigilancias.component.html',
  styleUrls: ['./vigilancias.component.scss']
})
export class VigilanciasComponent implements OnInit {
  paciente$ !: PacienteInterface;
  token  !: string;
  constructor(private readonly pacienteSvc : PacientesService, private readonly router : ActivatedRoute, private readonly tokenSvc : TokenService) { }

  ngOnInit(): void {
    this.pacienteSvc.getPaciente(this.router.snapshot.params['id'])
        .subscribe((result) => {
          if (result) {
            this.paciente$ = result;
          }
    })

    this.token = this.tokenSvc.getId().toString();
  }

}
