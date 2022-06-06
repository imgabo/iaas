
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUsuario } from '@auth/models/login-usuario.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm = this.fb.group({
    nombreUsuario : ['', Validators.required],
    password : ['', Validators.required]
  })
  usuario !: loginUsuario;
  constructor(
    private readonly loginSvc : AuthService,
    private  readonly tokenSvc : TokenService,
    private readonly router: Router,
    private readonly toastrService : ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit():void {
    this.usuario = this.loginForm.value;
    
    this.loginSvc.login(this.usuario).subscribe(
      (data) => {
        if (data.token){
          this.tokenSvc.setToken(data.token)
          this.router.navigate(['/home']);
        }else {
          console.log(data.response.message)
          this.toastrService.error(data.response.message, 'Advertencia' , {
            timeOut: 3000,
            positionClass: 'toast-top-center',
           
          });
        }
      }
      
    );
    //this.usuario.nombreUsuario = this.loginForm.value('username');
  }

}
