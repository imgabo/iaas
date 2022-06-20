import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaasService } from 'src/app/services/paas.service';
import { PAAS } from './models/paas.interface';

@Component({
  selector: 'app-paas',
  templateUrl: './paas.component.html',
  styleUrls: ['./paas.component.scss']
})
export class PaasComponent implements OnInit {

  paa !: PAAS;
  paas !: PAAS[];
  clonePaa : { [s: string]: PAAS } = {};

  nuevoPaaForm = this.fb.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$'),
      ],
    ],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly paasSvc : PaasService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarPaas();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevoPaaForm.controls;
  }

  cargarPaas() : void {
    this.paasSvc.getPaas().subscribe((data) => {
      this.paas = data;
    });
  }


  onSubmit(): void {
    this.paa = this.nuevoPaaForm.value;

    this.paasSvc
      .addPaas(this.paa)
      .subscribe({
        error: (e) =>
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }),

        complete: () => {
          this.cargarPaas() 
          this.nuevoPaaForm.controls['nombre'].setValue('');
          this.toastrService.success(
            'PAA Creado con Exito',
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

  onRowEditInit(paa : PAAS) {
    this.clonePaa[paa.id] = { ...paa };
  }

  onRowEditSave(paa : PAAS) {
    if (paa.nombre) {
      const id = paa.id;
      this.paasSvc
        .updatePaas(id, paa)
        .subscribe(() => {
          delete this.clonePaa[paa.id];
          this.toastrService.success(
            'PAA actualizado con exito',
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

  onRowEditCancel( paa : PAAS, index : number) {
    this.paasSvc.deletePaas(paa.id)
        .subscribe(() => {
          this.paas.splice(index, 1);
          delete this.clonePaa[paa.id];
         
          this.toastrService.info('PAA Eliminado', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        })
  }

}
