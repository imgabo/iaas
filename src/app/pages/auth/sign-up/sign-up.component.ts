import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NuevoUsario } from '../models/registro-usuario.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  usuario !: NuevoUsario;
  registerForm = this.fb.group({
    nombre : ['',[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$')]],
    apellido : ['',[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$')]],
    nombreUsuario : ['',[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+([\\.:_\\-=!\\?]){0,5}([a-zA-Z0-9])+$')]],
    email : ['',Validators.required],
    password : ['',[Validators.required, Validators.minLength(3)]],
  })
  constructor(private readonly fb : FormBuilder,
    private readonly registroSvc : AuthService,
    private readonly toastrService : ToastrService,
    private readonly router : Router) { }

  ngOnInit(): void {
  }

  get f(): {[key:string]: AbstractControl}{
    return this.registerForm.controls;
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
