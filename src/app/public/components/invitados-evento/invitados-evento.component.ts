import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-invitados-evento',
  templateUrl: './invitados-evento.component.html',
  styleUrls: ['./invitados-evento.component.scss']
})
export class InvitadosEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSiguiente(): void {
    this.siguiente.emit('config');
  }

  onAnterior(): void {
    this.siguiente.emit('opciones');
  }

}
