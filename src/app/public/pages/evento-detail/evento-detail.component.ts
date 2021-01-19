import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoControllerService, EventoFilter, EventoScopeFilter, EventoWithRelations, InvitadoWithRelations, OpcionElegidaControllerService } from 'destino';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IInvitado } from 'src/app/shared/interfaces/invitado.interface';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.scss']
})
export class EventoDetailComponent implements OnInit {

  id: string;
  evento: EventoWithRelations;
  creador: string;
  passwordInput = new FormControl('', Validators.required);
  error;
  autenticado = false;
  isLoggedIn: boolean;
  invitadosSinVotar: any[];
  invitadoSeleccionado = new FormControl();
  slidesForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventoController: EventoControllerService,
    private opcionElegidaController: OpcionElegidaControllerService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snak: MatSnackBar
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getEvento(this.id);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  verificar(): void {
    this.error = null;
    const password = this.passwordInput.value;
    console.log(password);
    this.eventoController.eventoControllerEventoAuth(this.id, { password })
      .subscribe(
        response => {
          console.log(response);
          this.getEvento(this.id, true);
          this.autenticado = true;
        },
        error => {
          console.log(error);
          this.error = error.error.error.message;
        }
      );
  }

  onCerrarSesion(): void {
    this.authService.logout();
  }

  onIniciarSesion(): void {
    this.router.navigateByUrl('/auth/login');
  }

  // private setVotosTotales(evento): void {
  //   evento.invitados.forEach(invitado => {
  //     if (invitado.opcionElegidas) {
  //       invitado.opcionElegidas.forEach(opcion => {
  //         if (this.votosTotales.hasOwnProperty(opcion.id)) {
  //           this.votosTotales[opcion.id] = this.votosTotales[opcion.id] + 1;
  //         } else {
  //           this.votosTotales[opcion.id] = 1;
  //         }
  //       })
  //     }
  //   })
  // }

  private getNombreCreador(invitados: InvitadoWithRelations[]): string {
    const creador = invitados.find(invitado => invitado.creador);
    return creador.nombre;
  }

  private getInvitadosQueNoVotaron(invitados: any[]): IInvitado[] {
    return invitados.filter(invitado => !invitado.opcionElegidas);
  }

  private getEvento(id: string, includeRelations: boolean = false) {
    const filter: EventoFilter = {
      fields: {
        id: true,
        nombre: true,
        descripcion: true,
        password: false
      }
    };

    if (includeRelations) {

      filter.include = [
        {
          relation: 'invitados',
          scope: {
            include: [
              {
                relation: 'opcionElegidas'
              }
            ]
          }
        },
        {
          relation: 'opciones'
        }
      ];
    }
    this.eventoController.eventoControllerFindById(id, filter)
      .subscribe(
        response => {
          console.log('Find by id:', response);
          this.evento = response;
          if (includeRelations) {
            this.creador = this.getNombreCreador(response.invitados);
            this.invitadosSinVotar = this.getInvitadosQueNoVotaron(this.evento.invitados);
            let slides = {};
            this.evento.opciones.forEach(opcion => {
              slides[opcion.id] = ''
            })
            this.slidesForm = this.formBuilder.group(slides);
          }
        }
      );
  }

  onVotar() {

    const opcionesElegidas = Object.entries(this.slidesForm.controls).filter(entry => entry[1].value).map(entry => entry[0]);
    opcionesElegidas.forEach(async opcionId => {
      await this.opcionElegidaController.opcionElegidaControllerCreate({
        invitadoId: this.invitadoSeleccionado.value,
        opcionId: opcionId
      }).toPromise();
    });

    this.getEvento(this.id, true);
    const invitado = this.evento.invitados.find(invitado => invitado.id == this.invitadoSeleccionado.value);
    this.snak.open(`¡Muy bien ${invitado.nombre}! Ya se guardó tu selección`, '¡OK!', {
      duration: 1500,
      direction: 'ltr'
    });
  }

}
