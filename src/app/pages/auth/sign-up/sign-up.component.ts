import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsario } from '@auth/models/registro-usuario.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  usuario !: NuevoUsario;
  registerForm = this.fb.group({
    nombre : ['',Validators.required],
    apellido : ['',Validators.required],
    nombreUsuario : ['',Validators.required],
    email : ['',Validators.required],
    password : ['',Validators.required],
  })
  constructor(private readonly fb : FormBuilder,
    private readonly registroSvc : AuthService,
    private readonly toastrService : ToastrService,
    private readonly router : Router) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
    this.usuario = this.registerForm.value;
    
    this.registroSvc.registro(this.usuario).subscribe({
      error: (e) => 
        this.toastrService.error(e.error.error, 'Advertencia' , {
            timeOut: 3000,
            positionClass: 'toast-top-center',
            
        }),
      complete: () => {
        this.toastrService.success('Usuario Creado Con Exito', 'Advertencia' , {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center',
        
        }),
        setTimeout(()=> {
          this.router.navigate(['/sign-in']);
        },3000)
      }
    });
      
   
  }

}
