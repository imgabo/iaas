import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DipService } from 'src/app/services/dip.service';
import { Dip } from './models/dip.interface';

@Component({
  selector: 'app-dip',
  templateUrl: './dip.component.html',
  styleUrls: ['./dip.component.scss'],
})
export class DipComponent implements OnInit {
  dip!: Dip;
  dips!: Dip[];
  cloneDips: { [s: string]: Dip } = {};
  dipForm = this.fb.group({
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
    private readonly dipSvc: DipService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarDips();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.dipForm.controls;
  }

  cargarDips(): void {
    this.dipSvc.getDips().subscribe((data) => {
      this.dips = data;
    });
  }

  onSubmit(): void {
    this.dip = this.dipForm.value;

    this.dipSvc.addDip(this.dip).subscribe({
      error: (e) =>
        this.toastrService.error(e.error.error, 'Advertencia', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        }),

      complete: () => {
        this.cargarDips();
        this.toastrService.success('DIP creado con exito', 'Advertencia', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  onRowEditInit(dip: Dip) {
    this.cloneDips[dip.id] = { ...dip };
  }

  onRowEditSave(dip: Dip) {
    if (dip.nombre) {
      const id = dip.id;
      this.dipSvc.updateDip(id, dip).subscribe((data) => {
        delete this.cloneDips[dip.id];
        this.toastrService.success('DIP actualizado con exito', 'Advertencia', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      });
    }
  }

  onRowEditCancel(dip: Dip, index: number) {
    this.dipSvc.deleteDip(dip.id).subscribe((data) => {
      this.dips.splice(index, 1);
      delete this.cloneDips[dip.id];
      this.toastrService.info('DIP Eliminado', 'Advertencia', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-right',
      });
    });
  }
}
