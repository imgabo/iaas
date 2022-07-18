import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ProcedimientosCirugia } from 'src/app/pages/admin/procedimientos-cirugias/models/procedimientos-cirugias.interface';
import { TipoHeridas } from 'src/app/pages/admin/tipo-heridas/models/tipo-heridas.interface';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ProcedimientoCirugiasService } from 'src/app/services/procedimiento-cirugias.service';
import { TipoHeridasService } from 'src/app/services/tipo-heridas.service';
import { VigilanciasProcedimientoscirugiasService } from 'src/app/services/vigilancias/procedimientoscirugiasvigilancias.service';
import { PacienteInterface } from '../../pacientes/models/paciente.interface';
import { nuevoComentarioVigilanciaProcedimiento } from './models/comentarioprocedimientovigilancias.interface';
import { ProcedimientoVigilancia } from './models/procedimientos.interface';
import { procedimientoVigilanciasPagination } from './models/procedimientoVigilanciasPagination.model';

@Component({
  selector: 'app-procedimientosvigilancias',
  templateUrl: './procedimientosvigilancias.component.html',
  styleUrls: ['./procedimientosvigilancias.component.scss']
})
export class ProcedimientosvigilanciasComponent implements OnInit {
  @Input() paciente !: PacienteInterface;
  @Input() token !: any;
  visible : boolean = false;
  loading : boolean = false;
  bitacoraVisible : boolean = false;
  procedimientos !: ProcedimientosCirugia[];
  vigilancias !: ProcedimientoVigilancia[];
  procedimiento !: ProcedimientoVigilancia;
  currentPage !: number;
  rowsPerPage !: number;
  totalRecords !: number;
  dataSource !: procedimientoVigilanciasPagination;
  heridas !: TipoHeridas[];

  comentario !: nuevoComentarioVigilanciaProcedimiento;
  comentarios !: nuevoComentarioVigilanciaProcedimiento[];

  asas  = [
    { id : '1' , nombre : 'ASA 1'},
    { id : '2' , nombre : 'ASA 2'},
    { id : '3' , nombre : 'ASA 3'},
    { id : '4' , nombre : 'ASA 4'},
    { id : '5' , nombre : 'ASA 5'}
  ]

  nuevaVigilanciaProcedimiento = this.fb.group ({
    id_procedimiento : ['', [Validators.required]],
    fecha_operacion : ['', [Validators.required]],
    fecha_revision : ['', [Validators.required]],
    id_herida : ['',[Validators.required]],
    asa : ['',[Validators.required]],
    fecha_alta : ['',[Validators.required]],
    control_post : [false],
    fecha_control : [''],
    antibioprofilaxis : [false],
    observacion : [''],
    id_paciente : ['', [Validators.required]],
    id_usuarioCreacion : ['', [Validators.required]]
  });

  addBitacora = this.fb.group ({
    contenido : ['', [Validators.required]],
    created_by : ['', [Validators.required]],
    id_procedimiento : ['', [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly pacienteSVC : PacientesService,
    private readonly toastrService: ToastrService,
    private readonly procedimientoCirugiasSvc : ProcedimientoCirugiasService,
    private readonly vigilanciasCirugiasSvc : VigilanciasProcedimientoscirugiasService,
    private readonly tipoHeridasSvc : TipoHeridasService,
    private readonly ConfirmationService : ConfirmationService,

  ) { }



  ngOnInit(): void {
    this.cargarProcedimientos();
    this.cargarHeridas();
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

  cargarVigilancias(event : LazyLoadEvent): void {
    if(event.first !== undefined && event.rows !== undefined){
      this.currentPage = (event.first / event.rows) + 1;
      this.rowsPerPage = event.rows;

    }
    this.reloadTable(this.paciente.id, this.currentPage , this.rowsPerPage)
  }

  reloadTable(paciente : string , currentPage : number , rowsPerPage : number) : void {
    this.loading = true
    this.pacienteSVC.getProcedimientos(paciente, currentPage, rowsPerPage).subscribe({
      next: (data : procedimientoVigilanciasPagination) => {

        this.dataSource = data;
        this.prepareDataSource();
      }
    })
  }

  cargarProcedimientos() : void {
    this.procedimientoCirugiasSvc.getProcedimientos().subscribe((data) => {
      this.procedimientos = data;
    })
  }

  cargarHeridas() : void {
    this.tipoHeridasSvc.getProcedimientos().subscribe((data) => {
      this.heridas = data;
    })
  }

  mostrarDialogo() : void{ // funcion para mostrar la vista de agregar vigilancia a paciente
    this.nuevaVigilanciaProcedimiento.controls['id_usuarioCreacion'].setValue(this.token);
    this.nuevaVigilanciaProcedimiento.controls['id_paciente'].setValue(this.paciente.id);
    this.visible = true;
  }

  resetearFormulario() : void {
    this.visible = false;
    this.nuevaVigilanciaProcedimiento.reset();
  }

  onSubmit() : void {
    this.nuevaVigilanciaProcedimiento.controls['id_procedimiento'].setValue(this.nuevaVigilanciaProcedimiento.controls['id_procedimiento'].value.toString());
    this.nuevaVigilanciaProcedimiento.controls['id_herida'].setValue(this.nuevaVigilanciaProcedimiento.controls['id_herida'].value.toString())
    this.nuevaVigilanciaProcedimiento.controls['id_paciente'].setValue(this.nuevaVigilanciaProcedimiento.controls['id_paciente'].value.toString())
    this.procedimiento = this.nuevaVigilanciaProcedimiento.value;

    this.ConfirmationService.confirm({
      message: 'Desea Registrar el Procedimiento?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.vigilanciasCirugiasSvc.addProcedimientoVigilancia(this.procedimiento).subscribe({
          error: (e) => {
            this.resetearFormulario();
            this.toastrService.error(e.error.error, 'Advertencia', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          },
          complete: () => {
            this.resetearFormulario();
            this.reloadTable(this.paciente.id,this.currentPage , this.rowsPerPage)
            this.toastrService.success(
              'Vigilancia de Procedimiento de Cirugia Agregado',
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
    this.addBitacora.controls['id_procedimiento'].setValue(id.toString());
    this.cargarBitacoras(id);
  }


  onSubmitBitacora():void {
    this.comentario =  this.addBitacora.value;
    this.vigilanciasCirugiasSvc.agregarComentario(this.comentario).subscribe({
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

        this.cargarBitacoras(this.comentario.id_procedimiento);
        this.addBitacora.controls['contenido'].reset();
      },
    })
  }

  cargarBitacoras(id : string): void {
    this.vigilanciasCirugiasSvc.getComentarios(id).subscribe((data) => {
      this.comentarios = data;
    })
  }

}
