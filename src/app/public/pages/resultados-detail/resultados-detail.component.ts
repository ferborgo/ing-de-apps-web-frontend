import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoControllerService, EventoFilter, InvitadoWithRelations } from 'destino';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-resultados-detail',
  templateUrl: './resultados-detail.component.html',
  styleUrls: ['./resultados-detail.component.scss']
})
export class ResultadosDetailComponent implements OnInit {

  evento: any;
  id: string;
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
    console.log('Resultados-detail init')
    this.id = this.route.snapshot.params.id;
    this.getEvento(this.id);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onCerrarSesion(): void {
    this.authService.logout();
  }

  onIniciarSesion(): void {
    this.router.navigateByUrl('/auth/login');
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
            let slides = {};
            this.evento.opciones.forEach(opcion => {
              slides[opcion.id] = ''
            });
          }
        }
      );
  }

}
