import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoresRiesgoComponent } from '../admin/factores-riesgo/factores-riesgo.component';
import { ServiciosComponent } from '../admin/servicios/servicios.component';
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
  path: 'factores-riesgo',
  component: FactoresRiesgoComponent
}
] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
