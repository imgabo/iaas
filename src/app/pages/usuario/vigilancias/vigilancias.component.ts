import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import { PacienteInterface } from '../pacientes/models/paciente.interface';

@Component({
  selector: 'app-vigilancias',
  templateUrl: './vigilancias.component.html',
  styleUrls: ['./vigilancias.component.scss']
})
export class VigilanciasComponent implements OnInit {
  paciente !: PacienteInterface;

  constructor(private readonly pacienteSvc : PacientesService, private readonly router : ActivatedRoute) { }

  ngOnInit(): void {
    this.pacienteSvc.getPaciente(this.router.snapshot.params['id'])
        .subscribe((result) => {
          if (result) {
            this.paciente = result;
          }
        })
  }

}
