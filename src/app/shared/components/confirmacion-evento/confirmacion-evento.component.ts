import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventoControllerService } from 'destino';
import { environment } from 'src/environments/environment';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-confirmacion-evento',
  templateUrl: './confirmacion-evento.component.html',
  styleUrls: ['./confirmacion-evento.component.scss']
})
export class ConfirmacionEventoComponent implements OnInit, OnDestroy {

  @Output() siguiente = new EventEmitter<string>();

  url: string;
  urlResultados: string;
  password: string;
  loading = true;

  constructor(
    private eventoService: EventoService,
    private eventoController: EventoControllerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventoController.eventoControllerFindById(this.eventoService.getNuevoEventoID())
      .toPromise()
      .then(response => {
        console.log('Backend response: ', response);
        if (response.codigoResultados) {
          this.urlResultados = this.armarURLResultados(response.codigoResultados);
        }
        this.url = this.armarURL();
        this.password = this.eventoService.getConfig().password;
        this.loading = false;
      });
  }
  armarURLResultados(codigoResultados: string): string {
    const id = this.eventoService.getNuevoEventoID();
    return `${environment.FRONTEND_URL}eventos/${id}/resultados/${codigoResultados}`;
  }

  onVolver(): void {
    this.siguiente.emit('nombre');
  }

  ngOnDestroy(): void {
    this.eventoService.resetAll();
  }

  private armarURL(): string {
    const id = this.eventoService.getNuevoEventoID();
    return `${environment.FRONTEND_URL}eventos/${id}`;
  }

}
