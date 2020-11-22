import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IInvitado } from '../../interfaces/invitado.interface';

@Component({
  selector: 'app-invitados-evento',
  templateUrl: './invitados-evento.component.html',
  styleUrls: ['./invitados-evento.component.scss']
})
export class InvitadosEventoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<string>();

  invitados: IInvitado[] = [];

  creadorForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
  });

  constructor() { }

  ngOnInit() {
  }

  onSiguiente(): void {
    this.siguiente.emit('config');
  }

  onAnterior(): void {
    this.siguiente.emit('opciones');
  }

  agregarOtro(): void {
    this.invitados.push({nombre: ''});
  }

}
