import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmacion-evento',
  templateUrl: './confirmacion-evento.component.html',
  styleUrls: ['./confirmacion-evento.component.scss']
})
export class ConfirmacionEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onVolver(): void {
    this.siguiente.emit('nombre');
  }

}
