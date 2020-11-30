import { Component, OnInit } from '@angular/core';
import { EventoControllerService, EventoWithRelations } from 'destino';
import { AuthService, IUser } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user: IUser;
  eventos: EventoWithRelations[];

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

}
