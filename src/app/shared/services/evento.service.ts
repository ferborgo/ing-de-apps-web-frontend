import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { EventoControllerService, EventoInvitadoControllerService, EventoOpcionControllerService, NewEvento, NewInvitadoInEvento, NewOpcionInEvento } from 'destino';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IConfig } from '../interfaces/config.interface';
import { IDatosGenerales } from '../interfaces/datos.generales.interface';
import { IInvitado } from '../interfaces/invitado.interface';

@Injectable()
export class EventoService {

  private datosGenerales: IDatosGenerales = { nombre: '' };
  private opciones: CalendarEvent[] = [];
  private invitados: IInvitado[] = [];
  private nuevoEventoID: string;
  private config: IConfig;

  constructor(
    private eventoController: EventoControllerService,
    private eventopOpcionController: EventoOpcionControllerService,
    private eventoInvitadoController: EventoInvitadoControllerService,
    private authService: AuthService
  ) { }

  async finalizar() {

    const nuevoEvento: NewEvento = {
      nombre: this.datosGenerales.nombre,
      descripcion: this.datosGenerales.descripcion,
      password: this.getConfig().password,
      resultadosPublicos: this.getConfig().resultadosPublicos,
      invitadosDinamicos: this.getConfig().invitadosDinamicos,
      soloUnaOpcion: this.getConfig().soloUnaOpcion
    };

    if (this.authService.isLoggedIn()) {
      const id = this.authService.getLoggedUser().id;
      nuevoEvento.usuarioCreadorID = id;
    }

    const response = await this.eventoController.eventoControllerCreate(nuevoEvento).pipe().toPromise();
    const nuevoEventoID = response.id;
    this.nuevoEventoID = response.id;
    console.log('Nuevo eventod ID: ', nuevoEventoID);
    this.opciones.forEach(async opcion => {

      // tslint:disable-next-line: prefer-const
      let nuevaOpcion: NewOpcionInEvento = {
        fechaInicio: opcion.start.toISOString(),
        fechaFinal: opcion.end.toISOString()
      };
      await this.eventopOpcionController.eventoOpcionControllerCreate(nuevoEventoID, nuevaOpcion).pipe().toPromise();
    });

    const creador: NewInvitadoInEvento = {
      creador: true,
      nombre: this.authService.getLoggedUser().username
    };
    await this.eventoInvitadoController.eventoInvitadoControllerCreate(nuevoEventoID, creador).pipe().toPromise();

    this.invitados.forEach(async invitado => {

      // tslint:disable-next-line: prefer-const
      let nuevoInvitado: NewInvitadoInEvento = {
        creador: false,
        nombre: invitado.nombre
      };
      await this.eventoInvitadoController.eventoInvitadoControllerCreate(nuevoEventoID, nuevoInvitado).pipe().toPromise();
    });

    console.log('Todo terminado...');
  }

  setConfig(aConfig: IConfig): void {
    this.config = aConfig;
  }

  getConfig(): IConfig {
    return this.config;
  }

  getNuevoEventoID(): string {
    return this.nuevoEventoID;
  }

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
