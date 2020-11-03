import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDatosGenerales } from '../../interfaces/datos.generales.interface';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-nombre-evento',
  templateUrl: './nombre-evento.component.html',
  styleUrls: ['./nombre-evento.component.scss']
})
export class NombreEventoComponent implements OnInit, OnDestroy {

  @Output() siguiente = new EventEmitter<string>();

  nombre: FormControl;
  descripcion: FormControl;

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    const datosGenerales: IDatosGenerales = this.eventoService.getDatosGenerales();
    this.nombre = new FormControl(datosGenerales.nombre || '');
    this.descripcion = new FormControl(datosGenerales.descripcion || '');
  }

  ngOnDestroy() {
    console.log('destruido nombre evento component');
  }

  onSiguiente(): void {
    const datosGenerales: IDatosGenerales = {
      nombre: this.nombre.value,
      descripcion: this.descripcion.value
    };
    this.eventoService.setDatosGenerales(datosGenerales);
    this.siguiente.emit('opciones');
  }

}
