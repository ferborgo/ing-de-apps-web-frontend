import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoControllerService, EventoPartial } from 'destino';
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

  eventoEdicion: EventoPartial;

  error: string;

  constructor(
    private service: EventoControllerService
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

  armarDate(opcion): string {
    return DateUtils.generarTitulo(opcion.fechaInicio, opcion.fechaFinal);
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
      }
    );
  }

}
