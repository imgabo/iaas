import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
}
] ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
