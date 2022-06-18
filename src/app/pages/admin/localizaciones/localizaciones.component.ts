import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalizacionesService } from 'src/app/services/localizaciones.service';
import { Localizacion } from './models/lozalizacion.interface';

@Component({
  selector: 'app-localizaciones',
  templateUrl: './localizaciones.component.html',
  styleUrls: ['./localizaciones.component.scss']
})
export class LocalizacionesComponent implements OnInit {
  localizacion !: Localizacion;
  localizaciones !: Localizacion[];
  cloneLocalizacion : { [s: string]: Localizacion } = {};

  nuevaLocalizacionForm = this.fb.group({
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
    private readonly localizacioneSvc : LocalizacionesService,
    private readonly toastrService: ToastrService) { }

  ngOnInit(): void {
    this.cargarLocalizaciones();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevaLocalizacionForm.controls;
  }

  cargarLocalizaciones() : void {
    this.localizacioneSvc.getLocalizaciones().subscribe((data) => {
      this.localizaciones = data;
    });
  }


  onSubmit(): void {
    this.localizacion = this.nuevaLocalizacionForm.value;

    this.localizacioneSvc
      .addLocalizaciones(this.localizacion)
      .subscribe({
        error: (e) =>
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }),

        complete: () => {
          this.cargarLocalizaciones() 
          this.toastrService.success(
            'Localizacion Creada con Exito',
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

  onRowEditInit(localizacion : Localizacion) {
    this.cloneLocalizacion[localizacion.id] = { ...localizacion};
  }

  onRowEditSave(localizacion : Localizacion) {
    if (localizacion.nombre) {
      const id = localizacion.id;
      this.localizacioneSvc
        .updateLocalizaciones(id, localizacion)
        .subscribe(() => {
          delete this.cloneLocalizacion[localizacion.id];
          this.toastrService.success(
            'Localizacion actualizada con exito',
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

  onRowEditCancel( localizacion : Localizacion, index : number) {
    this.localizacioneSvc.deleteLocalizaciones(localizacion.id)
        .subscribe(() => {
          this.localizaciones.splice(index, 1);
          delete this.cloneLocalizacion[localizacion.id];
         
          this.toastrService.info('Localizacion Eliminada', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        })
  }


}
