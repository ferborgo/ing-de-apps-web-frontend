import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Evento, EventoControllerService } from 'destino';
import { AuthService, IUser } from 'src/app/auth/services/auth.service';
import { SuscripcionService } from 'src/app/home/services/suscripcion.service';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-config-evento',
  templateUrl: './config-evento.component.html',
  styleUrls: ['./config-evento.component.scss']
})
export class ConfigEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  soloUnaOpcion = false;
  invitadosDinamicos = false;
  resultadosPrivados = false;

  password = new FormControl('');
  loading = false;

  puedeCrearEventos: boolean;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private suscripcionService: SuscripcionService,
    private eventoController: EventoControllerService
  ) { }

  async ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.puedeCrearEventos = await this.puedeCrearNuevosEventos();
    } else {
      this.puedeCrearEventos = true;
    }
  }

  private async puedeCrearNuevosEventos(): Promise<boolean> {
    const mesPagado = await this.suscripcionService.isMonthPaid().toPromise();
    if (mesPagado) {
      return true;
    } else {
      const eventos = await this.eventoController.eventoControllerFindForUser().toPromise();
      const eventosRestantes = this.calcularEventosRestantes(eventos);
      return eventosRestantes > 0;
    }
  }

  onSiguiente(): void {
    this.loading = true;
    this.eventoService.setConfig({
      password: this.password.value,
      soloUnaOpcion: this.soloUnaOpcion,
      invitadosDinamicos: this.invitadosDinamicos,
      resultadosPublicos: !this.resultadosPrivados
    });
    this.eventoService.finalizar()
      .then(
        response => {
          this.loading = false;
          this.siguiente.emit('confirmacion');
        }
      )
      .catch(
        error => {
          console.log('Error: ', error);
          this.loading = false;
        }
      );
  }

  onAnterior(): void {
    this.siguiente.emit('invitados');
  }

  private calcularEventosRestantes(eventos: Evento[]): number {
    const mesActual = new Date().getMonth();
    const eventosMesActual = eventos.filter(evento => new Date(evento.fechaCreacion).getMonth() === mesActual);
    return (this.eventoService.getEventosGratisPorMes() - eventosMesActual.length);
  }

}
