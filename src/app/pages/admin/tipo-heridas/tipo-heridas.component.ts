import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TipoHeridasService } from 'src/app/services/tipo-heridas.service';
import { TipoHeridas } from './models/tipo-heridas.interface';

@Component({
  selector: 'app-tipo-heridas',
  templateUrl: './tipo-heridas.component.html',
  styleUrls: ['./tipo-heridas.component.scss']
})
export class TipoHeridasComponent implements OnInit {
  tipoHerida !: TipoHeridas;
  tipoHeridas !: TipoHeridas[];
  cloneTipoHerida: { [s: string]: TipoHeridas } = {};
  tipoHeridaForm = this.fb.group({
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
    private readonly tipoHeridaSvc: TipoHeridasService,
    private readonly toastrService: ToastrService) { }

  ngOnInit(): void {
    this.cargarTipoHeridas();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.tipoHeridaForm.controls;
  }
  
  cargarTipoHeridas(): void {
    this.tipoHeridaSvc.getProcedimientos().subscribe((data) => {
      this.tipoHeridas = data;
    });
  }

  onSubmit(): void {
    this.tipoHerida = this.tipoHeridaForm.value;

    this.tipoHeridaSvc
      .addProcedimiento(this.tipoHerida)
      .subscribe({
        error: (e) =>
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }),

        complete: () => {
          this.cargarTipoHeridas();
          this.toastrService.success(
            'Tipo de Herida Creado con Exito',
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


  onRowEditInit(tipoHerida: TipoHeridas) {
    this.cloneTipoHerida[tipoHerida.id] = { ...tipoHerida };
  }

  onRowEditSave(tipoHerida: TipoHeridas) {
    if (tipoHerida.nombre) {
      const id = tipoHerida.id;
      this.tipoHeridaSvc
        .updateProcedimiento(id, tipoHerida)
        .subscribe((data) => {
          delete this.cloneTipoHerida[tipoHerida.id];
          this.toastrService.success(
            'Tipo de herida actualizado con exito',
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

  onRowEditCancel( tipoHerida: TipoHeridas, index : number) {
    this.tipoHeridaSvc.deleteProcedimiento(tipoHerida.id)
        .subscribe((data) => {
          this.tipoHeridas.splice(index , 1)
          delete this.cloneTipoHerida[tipoHerida.id];
         
          this.toastrService.info('Procedimiento de Cirugia Eliminado', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        })
  }

}
