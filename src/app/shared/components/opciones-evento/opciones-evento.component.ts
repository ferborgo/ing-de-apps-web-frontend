import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { IOpcion } from '../../interfaces/opcion.interface';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-opciones-evento',
  templateUrl: './opciones-evento.component.html',
  styleUrls: ['./opciones-evento.component.scss']
})
export class OpcionesEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();
  opciones: CalendarEvent[];

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.opciones = this.eventoService.getOpciones();
  }

  onSiguiente(): void {
    this.siguiente.emit('invitados');
  }

  onAnterior(): void {
    this.siguiente.emit('nombre');
  }


}
