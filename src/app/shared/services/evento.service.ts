import { Injectable } from '@angular/core';
import { EventoControllerService } from 'destino';
import { IDatosGenerales } from '../interfaces/datos.generales.interface';

@Injectable()
export class EventoService {

  private datosGenerales: IDatosGenerales = { nombre: '' };

  constructor(
    private eventoController: EventoControllerService
  ) { }

  setDatosGenerales(datos: IDatosGenerales): void {
    this.datosGenerales = datos;
  }

  getDatosGenerales(): IDatosGenerales {
    return this.datosGenerales;
  }

  example() {
    this.eventoController.eventoControllerFind().subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
