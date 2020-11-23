import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalendarComponent } from './components/calendar/calendar.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NuevoEventoComponent } from './components/nuevo-evento/nuevo-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigEventoComponent } from './components/config-evento/config-evento.component';
import { ConfirmacionEventoComponent } from './components/confirmacion-evento/confirmacion-evento.component';
import { InvitadosEventoComponent } from './components/invitados-evento/invitados-evento.component';
import { NombreEventoComponent } from './components/nombre-evento/nombre-evento.component';
import { OpcionesEventoComponent } from './components/opciones-evento/opciones-evento.component';
import { EventoService } from './services/evento.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}



@NgModule({
  declarations: [
    CalendarComponent,
    NuevoEventoComponent,
    NombreEventoComponent,
    OpcionesEventoComponent,
    InvitadosEventoComponent,
    ConfigEventoComponent,
    ConfirmacionEventoComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    EventoService
  ],
  exports: [
    CalendarComponent,
    NuevoEventoComponent
  ]
})
export class SharedModule { }
