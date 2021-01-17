import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-config-evento',
  templateUrl: './config-evento.component.html',
  styleUrls: ['./config-evento.component.scss']
})
export class ConfigEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  password = new FormControl('');
  loading = false;

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() {
  }

  onSiguiente(): void {
    this.loading = true;
    this.eventoService.setConfig({password: this.password.value});
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

}
