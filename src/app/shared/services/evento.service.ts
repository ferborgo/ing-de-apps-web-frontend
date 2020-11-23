import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { EventoControllerService } from 'destino';
import { IDatosGenerales } from '../interfaces/datos.generales.interface';

@Injectable()
export class EventoService {

  private datosGenerales: IDatosGenerales = { nombre: '' };
  private opciones: CalendarEvent[] = [];

  constructor(
    private eventoController: EventoControllerService
  ) { }

  setDatosGenerales(datos: IDatosGenerales): void {
    this.datosGenerales = datos;
  }

  setOpciones(opciones: CalendarEvent[]): void {
    this.opciones = opciones;
  }

  getDatosGenerales(): IDatosGenerales {
    return this.datosGenerales;
  }

  getOpciones(): CalendarEvent[] {
    return this.opciones;
  }

  example() {
    this.eventoController.eventoControllerFind().subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
