import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { MiEventoDetailComponent } from './components/mi-evento-detail/mi-evento-detail.component';
import { SharedModule } from '../shared/shared.module';
import { HomeNuevoEventoComponent } from './pages/home-nuevo-evento/home-nuevo-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MercadoPagoSuccessComponent } from './pages/mercadopagosuccess/mercadopagosuccess.component';



@NgModule({
  declarations: [
    PerfilComponent,
    MiEventoDetailComponent,
    HomeNuevoEventoComponent,
    MercadoPagoSuccessComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
