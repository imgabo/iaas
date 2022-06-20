import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DipComponent } from '../admin/dip/dip.component';
import { IarepisComponent } from '../admin/iarepis/iarepis.component';
import { LocalizacionesComponent } from '../admin/localizaciones/localizaciones.component';
import { MicroorganismosComponent } from '../admin/microorganismos/microorganismos.component';
import { PaasComponent } from '../admin/paas/paas.component';
import { ProcedimientosCirugiasComponent } from '../admin/procedimientos-cirugias/procedimientos-cirugias.component';

import { ServiciosComponent } from '../admin/servicios/servicios.component';
import { TipoHeridasComponent } from '../admin/tipo-heridas/tipo-heridas.component';
import { UserlistComponent } from '../admin/userlist/userlist.component';
import { PacientesComponent } from '../usuario/pacientes/pacientes.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'user-list',
  component: UserlistComponent
},
{
  path: 'user-list/:id',
  component: UserlistComponent
},
{
  path: 'pacientes',
  component: PacientesComponent
},
{
  path: 'servicios',
  component: ServiciosComponent
},
{
  path: 'dip',
  component: DipComponent
},
{
  path: 'procedimientos-cirugia',
  component: ProcedimientosCirugiasComponent
},
{
  path: 'tipo-heridas',
  component: TipoHeridasComponent
},
{
  path: 'microorganismos',
  component: MicroorganismosComponent
},

{
  path: 'localizaciones',
  component: LocalizacionesComponent
},

{
  path: 'iarepis',
  component: IarepisComponent
},

{
  path: 'paas',
  component: PaasComponent
},



] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
