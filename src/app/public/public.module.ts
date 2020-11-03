import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NombreEventoComponent } from './components/nombre-evento/nombre-evento.component';
import { OpcionesEventoComponent } from './components/opciones-evento/opciones-evento.component';
import { InvitadosEventoComponent } from './components/invitados-evento/invitados-evento.component';
import { ConfigEventoComponent } from './components/config-evento/config-evento.component';
import { ConfirmacionEventoComponent } from './components/confirmacion-evento/confirmacion-evento.component';

@NgModule({
  declarations: [NuevoEventoComponent, NombreEventoComponent, OpcionesEventoComponent, InvitadosEventoComponent, ConfigEventoComponent, ConfirmacionEventoComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,

    // Material Modules
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PublicModule { }
