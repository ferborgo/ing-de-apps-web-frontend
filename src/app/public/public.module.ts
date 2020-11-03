import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { NuevoEventoComponent } from './pages/nuevo-evento/nuevo-evento.component';
import { NuevoEventoFormComponent } from './components/nuevo-evento-form/nuevo-evento-form.component';


@NgModule({
  declarations: [NuevoEventoComponent, NuevoEventoFormComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
