import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicios } from './models/servicio.interface';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  servicio !: Servicios;
  servicios !: Servicios[];
  serviciosForm = this.fb.group({
    nombre : ['',[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$')]],
  })
  constructor(private readonly fb : FormBuilder,
    private readonly serviciosSvc : ServiciosService,
    private readonly toastrService : ToastrService,
    private readonly router : Router
    ) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  get f(): {[key:string]: AbstractControl}{
    return this.serviciosForm.controls;
  }

  cargarServicios() : void {
    this.serviciosSvc.getServicios()
    .subscribe(data => {
       this.servicios = data;
    })
  }


  onSubmit() : void  {
    this.servicio = this.serviciosForm.value;
   
    this.serviciosSvc.addServicio(this.servicio).subscribe({
      error: (e) => 
        this.toastrService.error(e.error.error, 'Advertencia' , {
            timeOut: 3000,
            positionClass: 'toast-top-center',
            
        }),
      complete: () => {
        this.cargarServicios();
        this.toastrService.success('Servicio Creado con exito', 'Advertencia' , {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right',
          
        })
      
      }  
    });
  }

  deleteServicio(servicio : Servicios) {
    this.serviciosSvc.deleteServicios(servicio).subscribe({
      error: (e) => 
        this.toastrService.error(e.error.error, 'Advertencia' , {
            timeOut: 3000,
            positionClass: 'toast-top-center',
            
        }),
      complete: () => {
        this.cargarServicios();
        this.toastrService.info('Servicio Eliminado', 'Advertencia' , {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right',
          
        })
      
      }  
    });
  }



}
