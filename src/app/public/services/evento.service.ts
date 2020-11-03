import { Injectable } from '@angular/core';
import { IDatosGenerales } from '../interfaces/datos.generales.interface';

@Injectable()
export class EventoService {

  private datosGenerales: IDatosGenerales = { nombre: '' };

  constructor() { }

  setDatosGenerales(datos: IDatosGenerales): void {
    this.datosGenerales = datos;
  }

  getDatosGenerales(): IDatosGenerales {
    return this.datosGenerales;
  }
}
