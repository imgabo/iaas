import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProcedimientoCirugiasService } from 'src/app/services/procedimiento-cirugias.service';
import { ProcedimientosCirugia } from './models/procedimientos-cirugias.interface';

@Component({
  selector: 'app-procedimientos-cirugias',
  templateUrl: './procedimientos-cirugias.component.html',
  styleUrls: ['./procedimientos-cirugias.component.scss'],
})
export class ProcedimientosCirugiasComponent implements OnInit {
  procedimiento!: ProcedimientosCirugia;
  procedimientos!: ProcedimientosCirugia[];
  cloneProcedimiento: { [s: string]: ProcedimientosCirugia } = {};

  nuevoProcedimientoForm = this.fb.group({
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
    private readonly procedimientocirugiaSvc: ProcedimientoCirugiasService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarProcedimientos();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevoProcedimientoForm.controls;
  }

  cargarProcedimientos(): void {
    this.procedimientocirugiaSvc.getProcedimientos().subscribe((data) => {
      this.procedimientos = data;
    });
  }

  onSubmit(): void {
    this.procedimiento = this.nuevoProcedimientoForm.value;

    this.procedimientocirugiaSvc
      .addProcedimiento(this.procedimiento)
      .subscribe({
        error: (e) =>
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }),

        complete: () => {
          this.cargarProcedimientos();
          this.toastrService.success(
            'Procedimiento de Cirugia Creado con Exito',
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

  onRowEditInit(procedimiento: ProcedimientosCirugia) {
    this.cloneProcedimiento[procedimiento.id] = { ...procedimiento };
  }

  onRowEditSave(procedimiento: ProcedimientosCirugia) {
    if (procedimiento.nombre) {
      const id = procedimiento.id;
      this.procedimientocirugiaSvc
        .updateProcedimiento(id, procedimiento)
        .subscribe((data) => {
          delete this.cloneProcedimiento[procedimiento.id];
          this.toastrService.success(
            'Procedimiento actualizado con exito',
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

  onRowEditCancel( procedimiento : ProcedimientosCirugia, index : number) {
    this.procedimientocirugiaSvc.deleteProcedimiento(procedimiento.id)
        .subscribe((data) => {
          this.procedimientos.splice(index, 1);
          delete this.cloneProcedimiento[procedimiento.id];
         
          this.toastrService.info('Procedimiento de Cirugia Eliminado', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        })
  }
}
