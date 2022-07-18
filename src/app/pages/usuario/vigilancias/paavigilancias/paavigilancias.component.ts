import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { PAAS } from 'src/app/pages/admin/paas/models/paas.interface';
import { PaasService } from 'src/app/services/paas.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { PaasvigilanciasService } from 'src/app/services/vigilancias/paasvigilancias.service';
import { PacienteInterface } from '../../pacientes/models/paciente.interface';
import { nuevoComentarioVigilanciaPaas } from './models/comentariopaasvigilancias.interface';
import { PaasVigilancia } from './models/paasvigilancia.interface';
import { paasVigilanciaPagination } from './models/paasVigilanciaPagination.model';

@Component({
  selector: 'app-paavigilancias',
  templateUrl: './paavigilancias.component.html',
  styleUrls: ['./paavigilancias.component.scss']
})
export class PaavigilanciasComponent implements OnInit {
  @Input() paciente !: PacienteInterface;
  @Input() token !: any;
  visible : boolean = false;
  loading : boolean = false;
  bitacoraVisible : boolean = false;
  vigilancias !: PaasVigilancia[];
  vigilancia !: PaasVigilancia;
  currentPage !: number;
  rowsPerPage !: number;
  totalRecords !: number;
  dataSource !: paasVigilanciaPagination;
  comentario !: nuevoComentarioVigilanciaPaas;
  comentarios !: nuevoComentarioVigilanciaPaas[];

  paas !: PAAS[];

  nuevaVigilanciaPaas = this.fb.group ({
    id_paas : ['', [Validators.required]],
    dias : ['', [Validators.required]],
    n_procedimiento : ['', [Validators.required]],
    fecha_vigilancia : ['', [Validators.required]],
    observaciones : [''],
    id_paciente : ['', [Validators.required]],
    id_usuarioCreacion : ['', [Validators.required]],
  })

  addBitacora = this.fb.group ({
    contenido : ['', [Validators.required]],
    created_by : ['', [Validators.required]],
    id_vigilancia_paas : ['', [Validators.required]]
  });


  constructor(
    private readonly paaSVC : PaasService,
    private readonly pacienteSVC : PacientesService,
    private readonly toastrService: ToastrService,
    private readonly vigilanciasPaasSVC : PaasvigilanciasService,
    private readonly ConfirmationService : ConfirmationService,
    private readonly fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.paaSVC.getPaas().subscribe((data) => {
      this.paas = data;
    })
    this.reloadTable(this.paciente.id, 1 ,10);
  }


  prepareDataSource() : void {
    if (this.dataSource){
      this.rowsPerPage = this.dataSource.meta.itemsPerPage;
      this.totalRecords = this.dataSource.meta.totalItems;
      this.vigilancias = this.dataSource.items;
      this.loading = false
    }
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
    this.pacienteSVC.getPaas(paciente, currentPage, rowsPerPage).subscribe({
      next: (data : paasVigilanciaPagination) => {
        this.dataSource = data;
        this.prepareDataSource();
      }
    })
  }

  mostrarDialogo() : void {
    this.nuevaVigilanciaPaas.controls['id_usuarioCreacion'].setValue(this.token);
    this.nuevaVigilanciaPaas.controls['id_paciente'].setValue(this.paciente.id.toString());
    this.visible = true;
  }

  resetearFormulario() : void {
    this.visible = false;
    this.nuevaVigilanciaPaas.reset();
  }

  onSubmit() : void {
    this.nuevaVigilanciaPaas.controls['id_paas'].setValue(this.nuevaVigilanciaPaas.controls['id_paas'].value.toString());
    this.nuevaVigilanciaPaas.controls['n_procedimiento'].setValue(this.nuevaVigilanciaPaas.controls['n_procedimiento'].value.toString())
    this.vigilancia = this.nuevaVigilanciaPaas.value;

    this.ConfirmationService.confirm({
      message: 'Desea Registrar el PAAS?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.vigilanciasPaasSVC.addPaasVigilancia(this.vigilancia).subscribe({
          error: (e) => {
           // this.resetearFormulario();
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
              'Vigilancia de PAAS Agregado',
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

  // BITACORAS

  agregarBitacora(id : string) : void {
    this.bitacoraVisible= true;
    this.addBitacora.controls['created_by'].setValue(this.token);
    this.addBitacora.controls['id_vigilancia_paas'].setValue(id.toString());
    this.cargarBitacoras(id);
  }

  onSubmitBitacora():void {
    this.comentario =  this.addBitacora.value;
    this.vigilanciasPaasSVC.agregarComentario(this.comentario).subscribe({
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

        this.cargarBitacoras(this.comentario.id_vigilancia_paas);
        this.addBitacora.controls['contenido'].reset();
      },
    })
  }

  cargarBitacoras(id : string): void {
    this.vigilanciasPaasSVC.getComentarios(id).subscribe((data) => {
      this.comentarios = data;
    })
  }

}
