import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'eventos',
    component: EventosComponent,
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
