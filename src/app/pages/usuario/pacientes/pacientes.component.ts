import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  generos: any[] = [
    {name:'Masculino'},
    {name:'Femenino'}
  ];

  servicios !: any[]
  constructor(private readonly servicioSvc : ServiciosService) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(){
    this.servicioSvc.getServicios()
    .subscribe(data => {
       this.servicios = data;
    })
  }

}
