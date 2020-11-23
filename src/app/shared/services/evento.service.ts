import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { EventoControllerService } from 'destino';
import { IDatosGenerales } from '../interfaces/datos.generales.interface';
import { IInvitado } from '../interfaces/invitado.interface';

@Injectable()
export class EventoService {

  private datosGenerales: IDatosGenerales = { nombre: '' };
  private opciones: CalendarEvent[] = [];
  private invitados: IInvitado[] = [];

  constructor(
    private eventoController: EventoControllerService
  ) { }

  setDatosGenerales(datos: IDatosGenerales): void {
    this.datosGenerales = datos;
  }

  setOpciones(opciones: CalendarEvent[]): void {
    this.opciones = opciones;
  }

  setInvitados(invitados: IInvitado[]): void {
    this.invitados = invitados;
  }

  getDatosGenerales(): IDatosGenerales {
    return this.datosGenerales;
  }

  getOpciones(): CalendarEvent[] {
    return this.opciones;
  }

  getInvitados(): IInvitado[] {
    return this.invitados;
  }

  resetAll(): void {
    this.datosGenerales = { nombre: '' };
    this.invitados = [];
    this.opciones = [];
  }

  example() {
    this.eventoController.eventoControllerFind().subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
