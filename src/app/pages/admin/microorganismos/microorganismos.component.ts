import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MicroorganismosService } from 'src/app/services/microorganismos.service';
import { Microorganismos } from './models/microorganismos.interface';

@Component({
  selector: 'app-microorganismos',
  templateUrl: './microorganismos.component.html',
  styleUrls: ['./microorganismos.component.scss']
})
export class MicroorganismosComponent implements OnInit {
  microorganismo !: Microorganismos;
  microorganismos !: Microorganismos[];
  cloneMicroorganismo : { [s: string]: Microorganismos } = {};

  nuevoMicroorganismoForm = this.fb.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$'),
      ],
    ],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly microorganismoSvc : MicroorganismosService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarMicroorganismos();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevoMicroorganismoForm.controls;
  }

  cargarMicroorganismos() : void {
    this.microorganismoSvc.getMicroorganismos().subscribe((data) => {
      this.microorganismos = data;
    });
  }

  onSubmit(): void {
    this.microorganismo = this.nuevoMicroorganismoForm.value;

    this.microorganismoSvc
      .addMigroorganismo(this.microorganismo)
      .subscribe({
        error: (e) =>
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }),

        complete: () => {
          this.cargarMicroorganismos() 
          this.nuevoMicroorganismoForm.controls['nombre'].setValue('');
          this.toastrService.success(
            'Microorganismo Creado con Exito',
            'Advertencia',
            {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right',
            }
          );
        },
      });
  }

  onRowEditInit(microorganismo: Microorganismos) {
    this.cloneMicroorganismo[microorganismo.id] = { ...microorganismo };
  }

  onRowEditSave(microorganismo: Microorganismos) {
    if (microorganismo.nombre) {
      const id = microorganismo.id;
      this.microorganismoSvc
        .updateMicrooganismo(id, microorganismo)
        .subscribe(() => {
          delete this.cloneMicroorganismo[microorganismo.id];
          this.toastrService.success(
            'Microorganismo actualizado con exito',
            'Advertencia',
            {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right',
            }
          );
        });
    }
  }

  onRowEditCancel( microorganismo : Microorganismos, index : number) {
    this.microorganismoSvc.deleteMicroorganismo(microorganismo.id)
        .subscribe(() => {
          this.microorganismos.splice(index, 1);
          delete this.cloneMicroorganismo[microorganismo.id];
         
          this.toastrService.info('Microorganismo Eliminado', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        })
  }

}
