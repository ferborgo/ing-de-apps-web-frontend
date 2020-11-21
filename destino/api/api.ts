export * from './eventoController.service';
import { EventoControllerService } from './eventoController.service';
export * from './eventoInvitadoController.service';
import { EventoInvitadoControllerService } from './eventoInvitadoController.service';
export * from './eventoOpcionController.service';
import { EventoOpcionControllerService } from './eventoOpcionController.service';
export * from './pingController.service';
import { PingControllerService } from './pingController.service';
export const APIS = [EventoControllerService, EventoInvitadoControllerService, EventoOpcionControllerService, PingControllerService];
