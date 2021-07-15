import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { EventoControllerService, EventoFilter, EventoWithRelations } from 'destino';
import { AuthService, IUser } from 'src/app/auth/services/auth.service';
import { IConfig } from 'src/app/shared/interfaces/config.interface';
import { IDatosGenerales } from 'src/app/shared/interfaces/datos.generales.interface';
import { IInvitado } from 'src/app/shared/interfaces/invitado.interface';
import { IOpcion } from 'src/app/shared/interfaces/opcion.interface';
import { EventoService } from 'src/app/shared/services/evento.service';
import { MercadopagoService } from 'src/app/shared/services/mercadopago.service';
import { SuscripcionService } from '../../services/suscripcion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user: IUser;
  eventos: EventoWithRelations[];
  viendoEvento = false;
  eventoViendo: any;
  mostrarSidebar = true;
  anchoEventos = 70;
  mesPagado: boolean;

  constructor(
    private authService: AuthService,
    private eventoController: EventoControllerService,
    private eventoService: EventoService,
    private snak: MatSnackBar,
    private mp: MercadopagoService,
    private suscripcionService: SuscripcionService
  ) { }

  ngOnInit() {
    this.user = this.authService.getLoggedUser();

    this.suscripcionService.isMonthPaid().subscribe(res => this.mesPagado = res);

    this.findAll();
  }

  private findAll(mensaje?: string): void {
    this.eventoController.eventoControllerFindForUser().subscribe(
      res => {
        this.eventos = res;
        if (mensaje) {
          this.snak.open(mensaje, '¡Bueno!', {
            duration: 2000
          });
        }
      },
      error => console.log('Error: ', error)
    );
  }

  onCerrarSesion(): void {
    this.authService.logout();
  }

  onVerEvento(evento) {
    this.eventoViendo = evento;
    this.viendoEvento = true;
  }

  onSalirDeEvento(event) {
    this.eventoViendo = null;
    this.viendoEvento = false;
  }

  toggleSidebar(): void {
    this.mostrarSidebar = !this.mostrarSidebar;
    if (this.mostrarSidebar) {
      this.anchoEventos = 70;
    } else {
      this.anchoEventos = 100;
    }
  }

  onClonar(evento) {
    console.log(evento);
    const config: IConfig = {
      invitadosDinamicos: evento.invitadosDinamicos,
      password: evento.password,
      resultadosPublicos: evento.resultadosPublicos,
      soloUnaOpcion: evento.soloUnaOpcion
    };
    this.eventoService.setConfig(config);


    const datos: IDatosGenerales = {
      nombre: `${evento.nombre} (clonado)`,
      descripcion: evento.descripcion
    };
    this.eventoService.setDatosGenerales(datos);


    const invitados: IInvitado[] = [];
    evento.invitados.forEach(invitado => {
      // tslint:disable-next-line: prefer-const
      let nuevoInvitado: IInvitado = {
        creador: invitado.creador,
        nombre: invitado.nombre,
        email: invitado.email
      };
      invitados.push(nuevoInvitado);
    });
    this.eventoService.setInvitados(invitados);


    const opciones: CalendarEvent[] = [];
    evento.opciones.forEach(opcion => {
      // tslint:disable-next-line: prefer-const
      let nuevaOpcion: CalendarEvent = {
        title: '',
        start: new Date(opcion.fechaInicio),
        end: new Date(opcion.fechaFinal)
      };
      opciones.push(nuevaOpcion);
    });
    this.eventoService.setOpciones(opciones);

    this.eventoService.finalizar()
      .then(response => {
        console.log(response);
        this.findAll('Se ha clonado el evento satisfactoriamente');
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  onEliminar(evento) {
    this.eventoController.eventoControllerDeleteById(evento.id).subscribe(
      response => {
        this.findAll('Se ha eliminado el evento satisfactoriamente');
      },
      error => {
        console.log(error);
        this.snak.open('Ha ocurrido un error al querer eliminar el evento', '¡Bueno!', {
          duration: 2000
        });
      }
    );
  }

  onPremium() {
    this.mp.comprar();
  }

}
