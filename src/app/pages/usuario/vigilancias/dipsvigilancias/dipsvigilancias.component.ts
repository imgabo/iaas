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
import { nuevoComentaripVigilanciaDIP } from './models/comentariodipvigilancias.interface';
import { PacientesService } from 'src/app/services/pacientes.service';
import { dipVigilanciasPagination } from './models/dipVigilanciasPagination.model';

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

  bitacoraVisible : boolean = false;
  currentPage !: number;
  rowsPerPage !: number;
  totalRecords !: number;
  dips !: Dip[];

  dataSource !: dipVigilanciasPagination;
  comentario !: nuevoComentaripVigilanciaDIP;
  comentarios !: nuevoComentaripVigilanciaDIP[];

  nuevaVigilanciaDips = this.fb.group({
    id_dip : ['', [Validators.required]],
    fecha_instalacion : ['', [Validators.required]],
    fecha_retiro : [''],
    id_paciente : [''],
    id_usuarioCreacion : [''],
    id_usuarioRetira : ['']
  })

  addBitacora = this.fb.group ({
    contenido : ['', [Validators.required]],
    created_by : ['', [Validators.required]],
    id_dip : ['', [Validators.required]]
  })



  constructor(
    private readonly fb: FormBuilder,
    private readonly dipsSvc : DipService,
    private readonly tokenSvc : TokenService,
    private readonly toastrService: ToastrService,
    private readonly pacienteSVC : PacientesService,
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
    this.reloadTable(this.paciente.id, 1, 10)
    this.nuevaVigilanciaDips.controls['id_usuarioCreacion'].setValue(this.token);

    this.nuevaVigilanciaDips.controls['id_paciente'].setValue(this.paciente.id);
  }


  prepareDataSource() : void {
    if (this.dataSource) {
      this.rowsPerPage = this.dataSource.meta.itemsPerPage
      this.totalRecords = this.dataSource.meta.totalItems;

      this.vigilancias = this.dataSource.items;
      this.loading = false
    }

  }

  cargarVigilancias(event: LazyLoadEvent) : void {

    if(event.first !== undefined && event.rows !== undefined){
      this.currentPage = (event.first / event.rows) + 1;
      this.rowsPerPage = event.rows;

    }
    this.reloadTable(this.paciente.id, this.currentPage , this.rowsPerPage)

  }



  reloadTable(paciente : string , currentPage : number , rowsPerPage : number) : void {
    this.loading = true
    this.pacienteSVC.getDips(paciente, currentPage, rowsPerPage).subscribe({
      next: (data : dipVigilanciasPagination) => {

        this.dataSource = data;
        this.prepareDataSource();
      }
    })
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

            this.toastrService.error(e.error.error, 'Advertencia', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          },
          complete: () => {
            this.reloadTable(this.paciente.id,this.currentPage , this.rowsPerPage)
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


  // BITACORA FUNCIONES //
  agregarBitacora(id : string) : void {
    this.bitacoraVisible= true;
    this.addBitacora.controls['created_by'].setValue(this.token);
    this.addBitacora.controls['id_dip'].setValue(id.toString());
    this.cargarBitacoras(id);
  }


  onSubmitBitacora() : void {
    this.comentario = this.addBitacora.value;

    this.vigilanciaDipSVC.agregarComentario(this.comentario).subscribe({
      error: (e) => {

        this.toastrService.error(e.error.error, 'Advertencia', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      },
      complete: () => {
        this.toastrService.success(
          'Bitacora Ingresada',
          'Advertencia',
          {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          }
        );

        this.cargarBitacoras(this.comentario.id_dip);
        this.addBitacora.controls['contenido'].reset();
      },
    })
  }

  cargarBitacoras(id : string ) : void {

    this.vigilanciaDipSVC.obtenerComentarios(id).subscribe((data) => {
      this.comentarios = data;
    })
  }
 // BITACORA FUNCIONES //

}
