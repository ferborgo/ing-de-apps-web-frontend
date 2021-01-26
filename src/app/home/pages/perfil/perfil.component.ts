import { Component, OnInit } from '@angular/core';
import { EventoControllerService, EventoFilter, EventoWithRelations } from 'destino';
import { AuthService, IUser } from 'src/app/auth/services/auth.service';

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

  constructor(
    private authService: AuthService,
    private eventoController: EventoControllerService
  ) { }

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    this.eventoController.eventoControllerFindForUser().subscribe(
      res => {
        console.log('Res: ', res);
        this.eventos = res;
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
    this.mostrarSidebar = ! this.mostrarSidebar;
    if (this.mostrarSidebar) {
      this.anchoEventos = 70;
    } else {
      this.anchoEventos = 100;
    }
  }

}
