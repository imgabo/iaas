import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Dip } from 'src/app/pages/admin/dip/models/dip.interface';
import { DipService } from 'src/app/services/dip.service';
import { TokenService } from 'src/app/services/token.service';
import { DipvigilanciasService } from 'src/app/services/vigilancias/dipvigilancias.service';
import { PacienteInterface } from '../../pacientes/models/paciente.interface';
import { DipVigilancia } from './models/dipvigilancias.interface';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dipsvigilancias',
  templateUrl: './dipsvigilancias.component.html',
  styleUrls: ['./dipsvigilancias.component.scss']
})
export class DipsvigilanciasComponent implements OnInit {
  @Input() paciente !: PacienteInterface;
  @Input() token !: any;
  visible : boolean =  false; // para hacer visible o no la vista de agregar un nuevo dip a un paciente
  loading : boolean = false; // lazy loading del selector de dips
  vigilanciaDIP !: DipVigilancia;
  vigilancias !: DipVigilancia[];
  localDbDIPS !: DipVigilancia[];
  totalRecordsDips !: number;
  dips !: Dip[];

  nuevaVigilanciaDips = this.fb.group({
    id_dip : ['', [Validators.required]],
    fecha_instalacion : ['', [Validators.required]],
    fecha_retiro : [''],
    id_paciente : [''],
    id_usuarioCreacion : [''],
    id_usuarioRetira : ['']
  })



  constructor(
    private readonly fb: FormBuilder,
    private readonly dipsSvc : DipService,
    private readonly tokenSvc : TokenService,
    private readonly toastrService: ToastrService,
    private readonly vigilanciaDipSVC : DipvigilanciasService,
    private readonly ConfirmationService : ConfirmationService,
    ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevaVigilanciaDips.controls;
  }


  ngOnInit(): void {
    this.dipsSvc.getDips().subscribe((data) =>{
      this.dips = data;
    })

    this.cargarVigilancias(this.paciente.id);

    this.nuevaVigilanciaDips.controls['id_usuarioCreacion'].setValue(this.token);

    this.nuevaVigilanciaDips.controls['id_paciente'].setValue(this.paciente.id);
  }


  cargarVigilancias(paciente : string) : void {
    this.vigilanciaDipSVC.getVigilancias(paciente).subscribe((data) => {
      this.localDbDIPS = data;
      this.totalRecordsDips = data.length;
    })
  }

  cargarDips(event : LazyLoadEvent){
    this.loading = true;
    setTimeout(() =>{
      if(this.localDbDIPS){
        if (event.first !== undefined && event.rows !== undefined){
          this.vigilancias = this.localDbDIPS.slice(event.first, (event.first + event.rows));
        }

        this.loading=false
      }
    }, 1000);
  }

  mostrarDialogo() : void{ // funcion para mostrar la vista de agregar dip a paciente
    this.visible = true;
  }

  resetearFormulario () : void {
    this.visible = false;
    this.nuevaVigilanciaDips.reset();
    this.nuevaVigilanciaDips.controls['id_usuarioCreacion'].setValue(this.token);
    this.nuevaVigilanciaDips.controls['id_paciente'].setValue(this.paciente.id);
  }

  onSubmit () : void {
    if (this.nuevaVigilanciaDips.controls['fecha_retiro'].value !== '') {
      this.nuevaVigilanciaDips.controls['id_usuarioRetira'].setValue(this.token);
    }
    this.vigilanciaDIP = this.nuevaVigilanciaDips.value;
    this.ConfirmationService.confirm({
      message: 'Desea Registrar el DIP?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.vigilanciaDipSVC.addVigilanciaDip(this.vigilanciaDIP).subscribe({
          error: (e) => {
            console.log(e)
            this.toastrService.error(e.error.error, 'Advertencia', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          },
          complete: () => {
            this.resetearFormulario();
            this.toastrService.success(
              'DIP Ingresado',
              'Advertencia',
              {
                timeOut: 3000,
                progressBar: true,
                positionClass: 'toast-top-right',
              }
            );
          },
        });
      },
      reject: () => {
        this.resetearFormulario();
      }
  });

  }



}
