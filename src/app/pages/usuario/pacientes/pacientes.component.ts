import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  valido : boolean = false;

  nuevoPacienteForm = this.fb.group({
    rut: [
      '',
      [
        
        Validators.required,
        Validators.minLength(6),
       
      ],
      
    ],
  });

  generos: any[] = [
    {name:'Masculino'},
    {name:'Femenino'}
  ];
  
  servicios !: any[]
  constructor
    (
      private readonly fb: FormBuilder,
      private readonly servicioSvc : ServiciosService,
      private readonly toastrService: ToastrService,
      private readonly http : HttpClient
    ) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevoPacienteForm.controls;
  }


  validateRut() : void {
    let rut = this.nuevoPacienteForm.controls['rut'].value;
    if(!rut){
      this.toastrService.error('Rut vacio', 'Advertencia', {
        timeOut:3000,
        positionClass: 'toast-top-right'
      });
    }
    this.http.get('https://api.libreapi.cl/rut/validate?rut=' + rut)
        .subscribe((data : any) =>{
          if (!data.data.valid) {
            this.toastrService.error(
              'Rut no Valido',
              'Advertencia',
              {
                timeOut: 3000,
                progressBar: true,
                positionClass: 'toast-top-right',
              }
            );
          } else {
            this.valido = true;
            this.nuevoPacienteForm.controls['rut'].disable();
          }
       
        });
    
  }

  cargarServicios(){
    this.servicioSvc.getServicios()
    .subscribe(data => {
       this.servicios = data;
    })
  }

}
