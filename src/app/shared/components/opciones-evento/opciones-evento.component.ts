import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-opciones-evento',
  templateUrl: './opciones-evento.component.html',
  styleUrls: ['./opciones-evento.component.scss']
})
export class OpcionesEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSiguiente(): void {
    this.siguiente.emit('invitados');
  }

  onAnterior(): void {
    this.siguiente.emit('nombre');
  }

}
