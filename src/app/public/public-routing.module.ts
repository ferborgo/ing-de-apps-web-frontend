import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoDetailComponent } from './pages/evento-detail/evento-detail.component';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento.component';
import { ResultadosDetailComponent } from './pages/resultados-detail/resultados-detail.component';


const routes: Routes = [
  {
    path: '',
    component: NuevoEventoComponent
  },
  {
    path: 'eventos/:id',
    component: EventoDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'eventos/:id/resultados/:codigoResultados',
    component: ResultadosDetailComponent,
    pathMatch: 'full'
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
