import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '@shared/footer/footer.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    FooterModule,
    ReactiveFormsModule,
    ToastrModule

  ]
})
export class SignInModule { }
