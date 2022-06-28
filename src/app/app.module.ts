import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { LeftPanelComponent } from './shared/left-panel/left-panel.component';
import {ButtonModule} from 'primeng/button';
import {MegaMenuModule} from 'primeng/megamenu';
import {PanelMenuModule} from 'primeng/panelmenu';
import { HttpClientModule } from '@angular/common/http';
import { MenuItemComponent } from './shared/left-panel/menu-item.component';
import { MenuService } from './services/app.menu.service';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { TableModule } from 'primeng/table';
import { UserlistComponent } from './pages/admin/userlist/userlist.component';
import { PacientesComponent } from './pages/usuario/pacientes/pacientes.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { ServiciosComponent } from './pages/admin/servicios/servicios.component';
import { DipComponent } from './pages/admin/dip/dip.component';
import { ProcedimientosCirugiasComponent } from './pages/admin/procedimientos-cirugias/procedimientos-cirugias.component';
import { TipoHeridasComponent } from './pages/admin/tipo-heridas/tipo-heridas.component';
import { MicroorganismosComponent } from './pages/admin/microorganismos/microorganismos.component';
import { LocalizacionesComponent } from './pages/admin/localizaciones/localizaciones.component';
import { IarepisComponent } from './pages/admin/iarepis/iarepis.component';
import { PaasComponent } from './pages/admin/paas/paas.component';
import { TooltipModule } from 'primeng/tooltip';
import { VigilanciasComponent } from './pages/usuario/vigilancias/vigilancias.component';
import { DipsvigilanciasComponent } from './pages/usuario/vigilancias/dipsvigilancias/dipsvigilancias.component';
import { ProcedimientosvigilanciasComponent } from './pages/usuario/vigilancias/procedimientosvigilancias/procedimientosvigilancias.component';
import { IarepisvigilanciasComponent } from './pages/usuario/vigilancias/iarepisvigilancias/iarepisvigilancias.component';
import { PaavigilanciasComponent } from './pages/usuario/vigilancias/paavigilancias/paavigilancias.component';



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeftPanelComponent,
    MenuItemComponent,
    UserlistComponent,
    PacientesComponent,
    ServiciosComponent,
    DipComponent,
    ProcedimientosCirugiasComponent,
    TipoHeridasComponent,
    MicroorganismosComponent,
    LocalizacionesComponent,
    IarepisComponent,
    PaasComponent,
    VigilanciasComponent,
    DipsvigilanciasComponent,
    ProcedimientosvigilanciasComponent,
    IarepisvigilanciasComponent,
    PaavigilanciasComponent,


  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    MegaMenuModule,
    PanelMenuModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    TableModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    TooltipModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
