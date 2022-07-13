import { Component, OnInit } from '@angular/core';
import { PAAS } from 'src/app/pages/admin/paas/models/paas.interface';
import { PaasService } from 'src/app/services/paas.service';

@Component({
  selector: 'app-paavigilancias',
  templateUrl: './paavigilancias.component.html',
  styleUrls: ['./paavigilancias.component.scss']
})
export class PaavigilanciasComponent implements OnInit {
  visible : boolean = false;
  paas !: PAAS[];
  constructor(private readonly paaSVC : PaasService) { }

  ngOnInit(): void {
    this.paaSVC.getPaas().subscribe((data) => {
      this.paas = data;
    })
  }

  mostrarDialogo() : void {
    this.visible = true;
  }

}
