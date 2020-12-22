import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoControllerService, EventoFilter, EventoWithRelations, InvitadoWithRelations } from 'destino';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  constructor(
    private route: ActivatedRoute,
    private eventoController: EventoControllerService,
    private authService: AuthService,
    private router: Router
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

  private getNombreCreador(invitados: InvitadoWithRelations[]): string {
    const creador = invitados.find(invitado => invitado.creador);
    return creador.nombre;
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
          relation: 'invitados'
        },
        {
          relation: 'opciones'
        }
      ];
    }
    this.eventoController.eventoControllerFindById(id, filter)
      .subscribe(
        response => {
          this.evento = response;
          if (includeRelations) {
            this.creador = this.getNombreCreador(response.invitados);
          }
        }
      );
  }

}
