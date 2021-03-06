import { toTypeScript } from '@angular/compiler';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IInvitado } from '../../interfaces/invitado.interface';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-invitados-evento',
  templateUrl: './invitados-evento.component.html',
  styleUrls: ['./invitados-evento.component.scss']
})
export class InvitadosEventoComponent implements OnInit, OnDestroy {

  @Output() siguiente = new EventEmitter<string>();

  controls: FormControl[] = [];

  isLoggedIn: boolean;

  creadorForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
  });

  constructor(
    private eventoSerive: EventoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.authService.getLoggedUser();
      this.creadorForm.setValue({nombre: user.username, email: user.email});
    }

    this.eventoSerive.getInvitados().forEach(invitado => {
      this.controls.push(new FormControl(invitado.nombre));
    });
  }

  onSiguiente(): void {
    this.siguiente.emit('config');
  }

  onAnterior(): void {
    this.siguiente.emit('opciones');
  }

  agregarOtro(): void {
    this.controls.push(new FormControl(''));
  }

  removeControl(control): void {
    const index = this.controls.indexOf(control);
    this.controls.splice(index, 1);
  }

  ngOnDestroy(): void {
    const invitados: IInvitado[] = this.controls.map(each => ({nombre: each.value, creador: false}));

    const creador: IInvitado = {
      nombre: this.creadorForm.get('nombre').value,
      email: this.creadorForm.get('email').value,
      creador: true
    };
    invitados.push(creador);
    this.eventoSerive.setInvitados(invitados);
  }

}
