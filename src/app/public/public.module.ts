import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { EventoDetailComponent } from './pages/evento-detail/evento-detail.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ResultadosDetailComponent } from './pages/resultados-detail/resultados-detail.component';

@NgModule({
  declarations: [
    NuevoEventoComponent,
    EventoDetailComponent,
    ResultadosDetailComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    DatePipe
  ]
})
export class PublicModule { }
