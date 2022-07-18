import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from 'src/app/services/pacientes.service';
import { PacienteInterface } from '../../pacientes/models/paciente.interface';
import { NuevoComentarioPaciente } from './models/comentariopacientes.interface';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() paciente !: PacienteInterface;
  @Input() token !: any;
  comentario !: NuevoComentarioPaciente;
  comentarios !: NuevoComentarioPaciente[];

  addComentario = this.fb.group ({
    contenido : ['', [Validators.required]],
    created_by : ['', [Validators.required]],
    id_paciente : ['', [Validators.required]]
  })


  constructor(
    private readonly fb: FormBuilder,
    private readonly pacienteSVC : PacientesService,
    private readonly toastrService: ToastrService,
    ) { }

  ngOnInit(): void {
    this.addComentario.controls['id_paciente'].setValue(this.paciente.id.toString());
    this.addComentario.controls['created_by'].setValue(this.token);
    this.cargarComentarios(this.paciente.id)
  }


  onSubmitComentario() : void {
    this.comentario = this.addComentario.value;
    this.pacienteSVC.addComentario(this.comentario).subscribe({
      error: (e) => {
        console.log(e)
        this.toastrService.error(e.error.error, 'Advertencia', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
      complete: () => {
        this.toastrService.success(
          'Comentario Ingresado',
          'Advertencia',
          {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          }

        );
        this.cargarComentarios(this.comentario.id_paciente)
      }
    })
  }


  cargarComentarios(id : string) : void {
    this.pacienteSVC.getComentarios(id).subscribe ((data) =>{
      this.comentarios = data;
    } )
  }

}
