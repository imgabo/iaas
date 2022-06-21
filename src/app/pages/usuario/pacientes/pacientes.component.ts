import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicios } from '../../admin/servicios/models/servicio.interface';
import { PacienteInterface } from './models/paciente.interface';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  valido: boolean = false;
  paciente !: PacienteInterface;
  datePipe : DatePipe = new DatePipe('en-US');
  nuevoPacienteForm = this.fb.group({
    rut: ['231832785', [Validators.required, Validators.minLength(6)]],
    nombre: ['gabriel', [Validators.required, Validators.minLength(6)]],
    segundo_nombre: ['alfonso', [Validators.required, Validators.minLength(6)]],
    apellido_paterno: ['martinez', [Validators.required, Validators.minLength(6)]],
    apellido_materno: ['plaz', [Validators.required, Validators.minLength(6)]],
    edad: ['23', [Validators.required, Validators.minLength(6)]],
    sexo: ['', [Validators.required]],
    fecha_nacimiento: ['', [Validators.required, Validators.minLength(6)]],
    fecha_hospitalizacion: ['', [Validators.required, Validators.minLength(6)]],
    servicio_ingreso: ['', [Validators.required, Validators.minLength(6)]],
  });

  generos: any[] = [{ name: 'Masculino' }, { name: 'Femenino' }];
  
  servicios!: any[];
  constructor(
    private readonly fb: FormBuilder,
    private readonly servicioSvc: ServiciosService,
    private readonly pacienteSvc : PacientesService,
    private readonly toastrService: ToastrService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this
    this.cargarServicios();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevoPacienteForm.controls;
  }

  //usamos la api de libreapi.cl para verificar que el rut tenga formato adecuado, (NO COMPRUEBA QUE EXISTA)
  validateRut(): void {
    let rut = this.nuevoPacienteForm.controls['rut'].value;
    if (!rut) {
      this.toastrService.error('Rut vacio', 'Advertencia', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
    this.http
      .get('https://api.libreapi.cl/rut/validate?rut=' + rut)
      .subscribe((data: any) => {
        if (!data.data.valid) {
          this.toastrService.error('Rut no Valido', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        } else {
          this.valido = true;
          this.nuevoPacienteForm.controls['rut'].disable();
        }
    });
  }

  // FIN DE API LIBREAPI.CL

  cargarServicios() {
    this.servicioSvc.getServicios().subscribe((data) => {
      this.servicios = data;
    });
  }


  // AGREGAR PACIENTE 
  onSubmit () : void {
    
    
    this.paciente = this.nuevoPacienteForm.value;
    console.log(this.paciente.servicio_ingreso);
  
    this.paciente.fecha_nacimiento = this.datePipe.transform(this.paciente.fecha_nacimiento, 'yyyy-MM-dd')!;
    this.paciente.fecha_hospitalizacion = this.datePipe.transform(this.paciente.fecha_hospitalizacion, 'dd-MM-yyyy, h:mm a')!;

   
    
    this.pacienteSvc.create(this.paciente).subscribe({
      error: (e) =>
         { console.log(e)
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          })},

        complete: () => {
          this.toastrService.success(
            'Paciente Ingresado',
            'Advertencia',
            {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right',
            }
          );
        },
    })
  }

}
