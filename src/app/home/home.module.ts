import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { MiEventoDetailComponent } from './components/mi-evento-detail/mi-evento-detail.component';
import { SharedModule } from '../shared/shared.module';
import { HomeNuevoEventoComponent } from './pages/home-nuevo-evento/home-nuevo-evento.component';



@NgModule({
  declarations: [PerfilComponent, MiEventoDetailComponent, HomeNuevoEventoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class HomeModule { }
