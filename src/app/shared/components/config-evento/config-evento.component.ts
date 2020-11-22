import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-config-evento',
  templateUrl: './config-evento.component.html',
  styleUrls: ['./config-evento.component.scss']
})
export class ConfigEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSiguiente(): void {
    this.siguiente.emit('confirmacion');
  }

  onAnterior(): void {
    this.siguiente.emit('invitados');
  }

}
