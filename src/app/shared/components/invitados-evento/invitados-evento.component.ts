import { toTypeScript } from '@angular/compiler';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  creadorForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
  });

  constructor(
    private eventoSerive: EventoService
  ) { }

  ngOnInit() {
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
    const invitados: IInvitado[] = this.controls.map(each => ({nombre: each.value}));
    this.eventoSerive.setInvitados(invitados);
  }

}
