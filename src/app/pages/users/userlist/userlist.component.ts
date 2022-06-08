import { Component, OnDestroy, OnInit } from '@angular/core';
import { data } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.interface';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {
  opciones: DataTables.Settings = {};
  users : User[] = [];
  boton !: string;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private readonly userSvc : UsersService) { }


  ngOnInit(): void {
    this.opciones = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language: {
        url:'//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'
      }
    };
    this.cargarUsuarios();
  }

  cargarUsuarios() : void {
    this.userSvc.getUsuarios()
    .subscribe(data =>{
        this.users = data;
        
        this.dtTrigger.next(data);
      }
    )
  }

  setStatus(user : User) : void {
    user.whitelist.status = !user.whitelist.status
   

    this.userSvc.setStatus(user.id, user)
      .subscribe();
    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



  



}
