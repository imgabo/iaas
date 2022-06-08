import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterModule } from '@shared/footer/footer.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from '@shared/header/header.module';

import { LeftpanelModule } from '@shared/leftpanel/leftpanel.module';
import { DataTablesModule } from 'angular-datatables';
import { UserlistComponent } from './pages/users/userlist/userlist.component';
import { NewusersComponent } from './pages/users/newusers/newusers.component';



@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    NewusersComponent,

  ],
  imports: [
    ToastrModule.forRoot(),
    DataTablesModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    LeftpanelModule,
    AppRoutingModule,
    FooterModule,
    HeaderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
