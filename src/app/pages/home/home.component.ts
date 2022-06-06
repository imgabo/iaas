import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nombreUsuario !: string;
  constructor(private readonly tokenSvc : TokenService) { }

  ngOnInit(): void {
    this.nombreUsuario = this.tokenSvc.getNombreUsuario();
  }

}
