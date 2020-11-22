import { Component, OnInit } from '@angular/core';
import { AuthService, IUser } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user: IUser;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
  }

  onCerrarSesion(): void {
    this.authService.logout();
  }

}
