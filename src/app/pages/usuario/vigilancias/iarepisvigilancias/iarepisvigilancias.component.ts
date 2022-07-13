import { Component, OnInit } from '@angular/core';
import { IAREPIS } from 'src/app/pages/admin/iarepis/models/iarepis.interface';
import { IarepisService } from 'src/app/services/iarepis.service';

@Component({
  selector: 'app-iarepisvigilancias',
  templateUrl: './iarepisvigilancias.component.html',
  styleUrls: ['./iarepisvigilancias.component.scss']
})
export class IarepisvigilanciasComponent implements OnInit {
  visible : boolean = false;
  iarepis !: IAREPIS[];
  constructor(private readonly iarepisSVC : IarepisService) { }

  ngOnInit(): void {
    this.iarepisSVC.getIarepis().subscribe((data) => {
      this.iarepis = data;
    })
  }

  mostrarDialogo() : void {
    this.visible = true;
  }

}
