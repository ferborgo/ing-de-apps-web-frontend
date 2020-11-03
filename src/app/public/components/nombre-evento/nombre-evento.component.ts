import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nombre-evento',
  templateUrl: './nombre-evento.component.html',
  styleUrls: ['./nombre-evento.component.scss']
})
export class NombreEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSiguiente(): void {
    this.siguiente.emit('opciones');
  }

}
