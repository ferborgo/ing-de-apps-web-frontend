import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-confirmacion-evento',
  templateUrl: './confirmacion-evento.component.html',
  styleUrls: ['./confirmacion-evento.component.scss']
})
export class ConfirmacionEventoComponent implements OnInit, OnDestroy {

  @Output() siguiente = new EventEmitter<string>();

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() { }

  onVolver(): void {
    this.siguiente.emit('nombre');
  }

  ngOnDestroy(): void {
    this.eventoService.resetAll();
  }

}
