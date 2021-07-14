import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiEventoDetailComponent } from './components/mi-evento-detail/mi-evento-detail.component';
import { HomeNuevoEventoComponent } from './pages/home-nuevo-evento/home-nuevo-evento.component';
import { MercadoPagoSuccessComponent } from './pages/mercadopagosuccess/mercadopagosuccess.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


const routes: Routes = [
  {
    path: '',
    component: PerfilComponent
  },
  {
    path: 'eventos/nuevo',
    component: HomeNuevoEventoComponent,
  },
  {
    path: 'mercadopago/success',
    component: MercadoPagoSuccessComponent
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
export class HomeRoutingModule { }
