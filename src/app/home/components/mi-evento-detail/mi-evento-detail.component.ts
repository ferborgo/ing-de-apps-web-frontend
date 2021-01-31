import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EventoControllerService, EventoInvitadoControllerService, EventoPartial, InvitadoControllerService, InvitadoPartial, NewInvitadoInEvento } from 'destino';
import { DateUtils } from 'src/app/shared/utils/date.utils';

@Component({
  selector: 'app-mi-evento-detail',
  templateUrl: './mi-evento-detail.component.html',
  styleUrls: ['./mi-evento-detail.component.scss']
})
export class MiEventoDetailComponent implements OnInit {

  @Input() evento: any;
  @Output() salir = new EventEmitter();
  urlInvitados: string;

  nuevoInvitadoNombreInput = new FormControl('', [Validators.required, Validators.minLength(3)]);
  nuevoInvitadoEmailInput = new FormControl('');
  passwordInput: FormControl;

  eventoEdicion: EventoPartial;
  cambiandoPassword = false;
  error: string;

  editandoGeneral = false;
  nombreEventoInput: FormControl;
  descripcionEventoInput: FormControl;

  invitadoAEditar: any;
  invitadoAEditarNombreInput: FormControl;
  invitadoAEditarEmailInput: FormControl;

  constructor(
    private service: EventoControllerService,
    private eventoInvitadoController: EventoInvitadoControllerService,
    private snak: MatSnackBar,
    private invitadoService: InvitadoControllerService
  ) { }

  ngOnInit() {
    console.log('evento: ', this.evento);
    this.eventoEdicion = {
      codigoResultados: this.evento.codigoResultados,
      descripcion: this.evento.descripcion,
      nombre: this.evento.nombre,
      password: this.evento.password,
      resultadosPublicos: this.evento.resultadosPublicos,
      soloUnaOpcion: this.evento.soloUnaOpcion,
      invitadosDinamicos: this.evento.invitadosDinamicos,
      usuarioCreadorID: this.evento.usuarioCreadorID
    };
    this.urlInvitados = this.armarURL();
  }

  onVolver(): void {
    this.salir.emit(true);
  }

  onCambiarPassword(): void {
    this.cambiandoPassword = true;
    this.passwordInput = new FormControl(this.evento.password);
  }

  resetCambiarPassword(): void {
    this.cambiandoPassword = false;
    this.passwordInput = null;
  }

  actualizarPassword() {
    this.eventoEdicion.password = this.passwordInput.value;
    this.service.eventoControllerUpdateById(this.evento.id, this.eventoEdicion)
      .subscribe(() => {
        this.evento.password = this.eventoEdicion.password;
        this.resetCambiarPassword();
        this.snak.open('Se actualizó la contraseña de manera exitosa', '¡Genial!', {
          duration: 2000,
          direction: 'ltr'
        });
      });
  }

  onEditarGeneral(): void {
    this.nombreEventoInput = new FormControl(this.evento.nombre, [Validators.required, Validators.minLength(5)]);
    this.descripcionEventoInput = new FormControl(this.evento.descripcion);
    this.editandoGeneral = true;
  }

  actualizarGeneral(): void {
    this.eventoEdicion.nombre = this.nombreEventoInput.value;
    this.eventoEdicion.descripcion = this.descripcionEventoInput.value;
    this.service.eventoControllerUpdateById(this.evento.id, this.eventoEdicion)
      .subscribe(() => {
        this.evento.nombre = this.eventoEdicion.nombre;
        this.evento.descripcion = this.eventoEdicion.descripcion;
        this.resetEdicionGeneral();
        this.snak.open('Se actualizaron los datos generales', '¡Genial!', {
          duration: 2000,
          direction: 'ltr'
        });
      });
  }

  resetEdicionGeneral(): void {
    this.nombreEventoInput = null;
    this.descripcionEventoInput = null;
    this.editandoGeneral = false;
  }

  onAgregarNuevoInvitado() {
    const nuevoInvitado: NewInvitadoInEvento = {
      creador: false,
      nombre: this.nuevoInvitadoNombreInput.value
    };
    if (this.nuevoInvitadoEmailInput.value !== '') {
      nuevoInvitado.email = this.nuevoInvitadoEmailInput.value;
    }
    this.eventoInvitadoController.eventoInvitadoControllerCreate(this.evento.id, nuevoInvitado)
      .subscribe(
        (response) => {
          this.evento.invitados.push(response);
          this.nuevoInvitadoEmailInput.reset();
          this.nuevoInvitadoNombreInput.reset();
          this.snak.open(`Se agregó a ${nuevoInvitado.nombre} a la lista de invitados`, '¡Genial!', {
            duration: 2000,
            direction: 'ltr'
          });
        }
      );
  }

  desactivar(evento): void {
    this.eventoEdicion.activo = false;
    this.service.eventoControllerUpdateById(evento.id, this.eventoEdicion).subscribe(
      response => {
        this.evento.activo = false;
        this.snak.open('Se desactivó el evento', '¡Bueno!', {
          duration: 2000
        });
      }
    );
  }

  activar(evento): void {
    this.eventoEdicion.activo = true;
    this.service.eventoControllerUpdateById(evento.id, this.eventoEdicion).subscribe(
      response => {
        this.evento.activo = true;
        this.snak.open('Se activó nuevamente el evento', '¡Bueno!', {
          duration: 2000
        });
      }
    );
  }

  armarDate(opcion): string {
    return DateUtils.generarTitulo(opcion.fechaInicio, opcion.fechaFinal);
  }

  onEditarInvitado(invitado): void {
    console.log(invitado);
    this.invitadoAEditar = invitado;
    this.invitadoAEditarEmailInput = new FormControl(invitado.email);
    this.invitadoAEditarNombreInput = new FormControl(invitado.nombre, [Validators.required, Validators.minLength(3)]);
  }

  resetEdicionInvitado(): void {
    this.invitadoAEditar = null;
    this.invitadoAEditarEmailInput = null;
    this.invitadoAEditarNombreInput = null;
  }

  editarInvitado(): void {
    const id = this.invitadoAEditar.id;
    const invitadoPartial: InvitadoPartial = {
      creador: this.invitadoAEditar.creador,
      eventoId: this.invitadoAEditar.eventoId,
      nombre: this.invitadoAEditarNombreInput.value
    };

    if (this.invitadoAEditarEmailInput.value !== '' && this.invitadoAEditarEmailInput.value != null) {
      invitadoPartial.email = this.invitadoAEditarEmailInput.value;
    } else {
      delete invitadoPartial.email;
    }
    this.invitadoService.invitadoControllerUpdateById(id, invitadoPartial)
      .subscribe(() => {
        const invitadoOriginal = this.evento.invitados.find(invitado => invitado.id === id);
        invitadoOriginal.nombre = invitadoPartial.nombre;
        invitadoOriginal.email = invitadoPartial.email;
      });
    this.resetEdicionInvitado();
  }

  private armarURL(): string {
    const id = this.evento.id;
    return `localhost:4200/eventos/${id}`;
  }

  updateConfig(propiedad: string) {
    this.eventoEdicion[propiedad] = ! this.eventoEdicion[propiedad];
    this.service.eventoControllerUpdateById(this.evento.id, this.eventoEdicion).subscribe(
      () => {
        this.evento[propiedad] = this.eventoEdicion[propiedad];
        this.snak.open(`Se actualizó la config correctamente`, '¡Genial!', {
          duration: 2000,
          direction: 'ltr'
        });
      }
    );
  }

}
