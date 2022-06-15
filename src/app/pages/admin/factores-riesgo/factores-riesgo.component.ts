import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FactoresRiesgoService } from 'src/app/services/factores-riesgo.service';
import { FactorRiesgo } from './models/factores-riesgo.interface';

@Component({
  selector: 'app-factores-riesgo',
  templateUrl: './factores-riesgo.component.html',
  styleUrls: ['./factores-riesgo.component.scss'],
})
export class FactoresRiesgoComponent implements OnInit {
  factorRiesgo!: FactorRiesgo;
  factoresRiesgo !: FactorRiesgo[];
  clonedRiesgo: { [s: string]: FactorRiesgo; } = {};
  factoresRiesgoForm = this.fb.group({
    tipo: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$'),
      ],
    ],
    descripcion: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$'),
      ],
    ],
  });
  constructor(
    private readonly fb: FormBuilder,
    private readonly factoresRiesgoSvc: FactoresRiesgoService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarFactores();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.factoresRiesgoForm.controls;
  }

  cargarFactores(){
    this.factoresRiesgoSvc.getFactoresRiesgos()
        .subscribe(data =>{
          this.factoresRiesgo = data;
        })
  }

  onSubmit(): void {
    this.factorRiesgo = this.factoresRiesgoForm.value;

    this.factoresRiesgoSvc.addFactorRiesgo(this.factorRiesgo).subscribe({
      error: (e) =>
        this.toastrService.error(e.error.error, 'Advertencia', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        }),
      complete: () => {
        this.cargarFactores();
        this.toastrService.success(
          'Factor de Riesgo Creado con exito',
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

  onRowEditInit(factor : FactorRiesgo){
    this.clonedRiesgo[factor.id] = {...factor};
  }

  onRowEditSave(factor : FactorRiesgo){
    if(factor.tipo && factor.descripcion){//copmprobamos que no sea nulo
      

    }
  }




}
