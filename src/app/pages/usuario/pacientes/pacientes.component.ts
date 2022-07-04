import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicios } from '../../admin/servicios/models/servicio.interface';
import { PacienteInterface } from './models/paciente.interface';
import { LazyLoadEvent } from 'primeng/api';

import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  valido: boolean = false;
  paciente !: PacienteInterface;
  datePipe : DatePipe = new DatePipe('en-US');
  nuevoPacienteForm = this.fb.group({
    rut: ['', ],
    nombre: [{value: '', disabled: true }, [  Validators.required, Validators.minLength(6)]],
    segundo_nombre: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
    apellido_paterno: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
    apellido_materno: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
    edad: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
    sexo: [{value: '', disabled: true}, [Validators.required]],
    fecha_nacimiento: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
    fecha_hospitalizacion: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
    servicio_ingreso: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
  });

  generos: any[] = [{ name: 'Masculino' }, { name: 'Femenino' }];
  loading!: boolean;
  pacientes !: PacienteInterface[];
  servicios!: any[];
  localDB !: PacienteInterface[];
  totalRecords !: number;
  constructor(
    private readonly fb: FormBuilder,
    private readonly servicioSvc: ServiciosService,
    private readonly pacienteSvc : PacientesService,
    private readonly toastrService: ToastrService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.pacienteSvc.getPacientes().subscribe((data) =>{
      this.localDB = data;
      this.totalRecords = data.length;
    })

    this.cargarServicios();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.nuevoPacienteForm.controls;
  }

  //usamos la api de libreapi.cl para verificar que el rut tenga formato adecuado, (NO COMPRUEBA QUE EXISTA)
  validateRut(): void {
    let rut = this.nuevoPacienteForm.controls['rut'].value;
    if (!rut) {
      this.toastrService.error('Rut vacio', 'Advertencia', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
    this.http
      .get('https://api.libreapi.cl/rut/validate?rut=' + rut)
      .subscribe((data: any) => {
        if (!data.data.valid) {
          this.toastrService.error('Rut no Valido', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
        } else {
          this.toastrService.success('Rut Valido', 'Advertencia', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          });
          this.valido = true;
          this.nuevoPacienteForm.enable();
          this.nuevoPacienteForm.controls['rut'].disable();
        }
    });
  }

  // FIN DE API LIBREAPI.CL

  cargarServicios() {
    this.servicioSvc.getServicios().subscribe((data) => {
      this.servicios = data;
    });
  }


  cargarPacientes(event : LazyLoadEvent){
    this.loading = true;
    setTimeout(() =>{
      if(this.localDB){
        if (event.first !== undefined && event.rows !== undefined){
          this.pacientes = this.localDB.slice(event.first, (event.first + event.rows));
        }

        this.loading=false
      }
    }, 1000);
  }

  formatearRut(rutPaciente : string): string{
    let rut = rutPaciente;
    //Despejamos puntos
    rut = rut.replace(/\./g, '');
    //Despejamos guion
    rut = rut.replace('-','');

    //Aislamos cuerpo y digito verificador
    let cuerpo = rut.slice(0,-1); // -1 hace referencia al ultimo digito
    let dv = rut.slice(-1).toUpperCase();

    rut = cuerpo + '-' + dv;
    return rut ;
  }


  // AGREGAR PACIENTE
  onSubmit () : void {


    this.paciente = this.nuevoPacienteForm.getRawValue();
    this.paciente.rut = this.formatearRut(this.paciente.rut);


    this.paciente.fecha_nacimiento = this.datePipe.transform(this.paciente.fecha_nacimiento, 'yyyy-MM-dd')!;
    this.paciente.fecha_hospitalizacion = this.datePipe.transform(this.paciente.fecha_hospitalizacion, 'dd-MM-yyyy, h:mm a')!;



    this.pacienteSvc.create(this.paciente).subscribe({
      error: (e) =>
         {
          this.toastrService.error(e.error.error, 'Advertencia', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          })},

        complete: () => {
          this.toastrService.success(
            'Paciente Ingresado',
            'Advertencia',
            {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right',
            }
          );
        },
    })
  }


   // FUNCIONES DE LA TABLA PARA EXPORTAR //

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.pacientes);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "pacientes");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
   // FIN DE LAS FUNCIONES DE LA TABLA PARA EXPORTAR //

}
