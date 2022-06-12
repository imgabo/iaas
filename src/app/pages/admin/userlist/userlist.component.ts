import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from './models/user.interface';
import {TableModule} from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  users : User[] = [];


  constructor(private readonly userSvc : UsersService, private readonly toastrService : ToastrService,) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() : void {
    this.userSvc.getUsuarios()
    .subscribe(data =>{
        this.users = data;
        
      
      }
    )
  }


  setStatus(user : User) : void {
    user.whitelist.status = !user.whitelist.status
    this.userSvc.setStatus(user.id, user)
      .subscribe({
        complete: () => {
          this.toastrService.success('Acceso Modificado', 'Advertencia' , {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-right',
          
          })
        }
      });
    
  }
}
