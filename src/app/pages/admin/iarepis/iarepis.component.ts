import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IarepisService } from 'src/app/services/iarepis.service';
import { IAREPIS } from './models/iarepis.interface';

@Component({
  selector: 'app-iarepis',
  templateUrl: './iarepis.component.html',
  styleUrls: ['./iarepis.component.scss']
})
export class IarepisComponent implements OnInit {
  iarepi !: IAREPIS;
  iarepis !: IAREPIS[];
  cloneIarepi : { [s: string]: IAREPIS } = {};

  nuevoIarepisForm = this.fb.group({
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
    private readonly iarepisSVC : IarepisService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarIarepis();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevoIarepisForm.controls;
  }

  cargarIarepis() : void {
    this.iarepisSVC.getIarepis().subscribe((data) => {
      this.iarepis = data;
    });
  }

  onSubmit(): void {
    this.iarepi = this.nuevoIarepisForm.value;

    this.iarepisSVC
      .addIarepis(this.iarepi)
      .subscribe({
        error: (e) =>
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }),

        complete: () => {
          this.cargarIarepis() 
          this.toastrService.success(
            'Iarepis Creado con Exito',
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

  onRowEditInit(iarepi : IAREPIS) {
    this.cloneIarepi[iarepi.id] = { ...iarepi };
  }

  onRowEditSave(iarepi : IAREPIS) {
    if (iarepi.nombre) {
      const id = iarepi.id;
      this.iarepisSVC
        .updateIarepis(id, iarepi)
        .subscribe(() => {
          delete this.cloneIarepi[iarepi.id];
          this.toastrService.success(
            'Iarepis actualizado con exito',
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

  onRowEditCancel(iarepi : IAREPIS, index : number) {
    this.iarepisSVC.deleteIarepis(iarepi.id)
        .subscribe(() => {
          this.iarepis.splice(index, 1);
          delete this.cloneIarepi[iarepi.id];
         
          this.toastrService.info('Iarepis Eliminado', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        })
  }


}
