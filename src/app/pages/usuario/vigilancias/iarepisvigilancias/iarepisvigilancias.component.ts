import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IAREPIS } from 'src/app/pages/admin/iarepis/models/iarepis.interface';
import { IarepisService } from 'src/app/services/iarepis.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { IarepisvigilanciasService } from 'src/app/services/vigilancias/iarepisvigilancias.service';
import { PacienteInterface } from '../../pacientes/models/paciente.interface';
import { nuevoComentarioIarepis } from './models/comentarioiarepisvigilancias.interface';
import { IarepisVigilancia } from './models/iarepisVigilancias.interface';
import { iarepisVigilanciaPagination } from './models/iarepisVigilanciasPagination.model';

@Component({
  selector: 'app-iarepisvigilancias',
  templateUrl: './iarepisvigilancias.component.html',
  styleUrls: ['./iarepisvigilancias.component.scss']
})
export class IarepisvigilanciasComponent implements OnInit {
  @Input() paciente !: PacienteInterface;
  @Input() token !: any;
  visible : boolean = false;
  iarepis !: IAREPIS[];
  loading : boolean = false;
  currentPage !: number;
  rowsPerPage !: number;
  totalRecords !: number;
  vigilancia !: IarepisVigilancia;
  vigilancias !: IarepisVigilancia[];
  dataSource !: iarepisVigilanciaPagination;
  bitacoraVisible : boolean = false;
  comentarios !: nuevoComentarioIarepis[];
  comentario !: nuevoComentarioIarepis;


  nuevaVigilanciaIarepis = this.fb.group ({
    id_iarepis : ['', [Validators.required]],
    fecha_cultivo : ['', [Validators.required]],
    fecha_aviso_lab : ['', [Validators.required]],
    fecha_vigilancia: ['', [Validators.required]],
    observaciones : [''],
    id_paciente : ['', [Validators.required]],
    id_usuarioCreacion : ['', [Validators.required]]
  })


  addBitacora = this.fb.group ({
    contenido : ['', [Validators.required]],
    created_by : ['', [Validators.required]],
    id_vigilancia_iarepis : ['', [Validators.required]]
  })



  constructor(
      private readonly iarepisSVC : IarepisService,
      private readonly fb : FormBuilder,
      private readonly pacienteSVC : PacientesService,
      private readonly toastrService: ToastrService,
      private readonly vigilanciasIarepisSVC : IarepisvigilanciasService,
      private readonly ConfirmationService : ConfirmationService,
    ) { }

  ngOnInit(): void {
    this.iarepisSVC.getIarepis().subscribe((data) => {
      this.iarepis = data;
    })
    this.reloadTable(this.paciente.id, 1 ,10)
  }

  prepareDataSource() : void {
    if (this.dataSource){
      this.rowsPerPage = this.dataSource.meta.itemsPerPage;
      this.totalRecords = this.dataSource.meta.totalItems;
      this.vigilancias = this.dataSource.items;
      this.loading = false
    }
  }

  mostrarDialogo() : void {
    this.visible = true;
    this.nuevaVigilanciaIarepis.controls['id_usuarioCreacion'].setValue(this.token);
    this.nuevaVigilanciaIarepis.controls['id_paciente'].setValue(this.paciente.id);
  }

  resetearFormulario() : void {
    this.visible = false;
    this.nuevaVigilanciaIarepis.reset();
  }

  onSubmit() : void {
    this.nuevaVigilanciaIarepis.controls['id_iarepis'].setValue(this.nuevaVigilanciaIarepis.controls['id_iarepis'].value.toString());
    this.nuevaVigilanciaIarepis.controls['id_paciente'].setValue(this.nuevaVigilanciaIarepis.controls['id_paciente'].value.toString());
    this.vigilancia = this.nuevaVigilanciaIarepis.value;
    this.ConfirmationService.confirm({
      message: 'Desea Registrar el DIP?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.vigilanciasIarepisSVC.addIarepisVigilancia(this.vigilancia).subscribe({
          error: (e) => {
            this.resetearFormulario();
            console.log(e)
            this.toastrService.error(e.error.error, 'Advertencia', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          },
          complete: () => {
            this.resetearFormulario();
            this.reloadTable(this.paciente.id,this.currentPage , this.rowsPerPage)
            this.toastrService.success(
              'Vigilancia de Iarepis Agregado',
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



  cargarVigilancias(event : LazyLoadEvent): void {
    if(event.first !== undefined && event.rows !== undefined){
      this.currentPage = (event.first / event.rows) + 1;
      this.rowsPerPage = event.rows;

    }
    this.reloadTable(this.paciente.id, this.currentPage , this.rowsPerPage)
  }


  reloadTable(paciente : string , currentPage : number , rowsPerPage : number) : void {
    this.loading = true
    console.log('paciente -> ',paciente)
    this.pacienteSVC.getIarepis(paciente, currentPage, rowsPerPage).subscribe({
      next: (data : iarepisVigilanciaPagination) => {

        this.dataSource = data;
        this.prepareDataSource();
      }
    })
  }



  ///BITACORAS

  agregarBitacora(iarepis : string ):void {
    this.bitacoraVisible= true;
    this.addBitacora.controls['created_by'].setValue(this.token);
    this.addBitacora.controls['id_vigilancia_iarepis'].setValue(iarepis.toString());
    this.cargarBitacoras(iarepis);
  }

  cargarBitacoras(id : string ) : void {

    this.vigilanciasIarepisSVC.getComentarios(id).subscribe((data) => {
      this.comentarios = data;
    })
  }

  onSubmitBitacora() : void {
    this.comentario = this.addBitacora.value;

    this.vigilanciasIarepisSVC.agregarComentario(this.comentario).subscribe({
      error: (e) => {
        console.log(e)
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

        this.cargarBitacoras(this.comentario.id_vigilancia_iarepis);
        this.addBitacora.controls['contenido'].reset();
      },
    })
  }
}
