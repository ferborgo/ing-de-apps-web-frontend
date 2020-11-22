import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material/material.module';



@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
