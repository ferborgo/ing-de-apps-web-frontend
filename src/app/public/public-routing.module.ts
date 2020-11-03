import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento.component';


const routes: Routes = [
  {
    path: '',
    component: NuevoEventoComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
