import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoControllerService, EventoFilter, EventoWithRelations, InvitadoWithRelations } from 'destino';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.scss']
})
export class EventoDetailComponent implements OnInit {

  id: string;
  evento: EventoWithRelations;

  creador: string;

  constructor(
    private route: ActivatedRoute,
    private eventoController: EventoControllerService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    const filter: EventoFilter = {
      fields: {
        id: true,
        nombre: true,
        descripcion: true,
        password: false
      },
      include: [
        {
          relation: 'invitados'
        }
      ]
    };
    this.eventoController.eventoControllerFindById(this.id, filter)
      .subscribe(
        response => {
          this.evento = response;
          this.creador = this.getNombreCreador(response.invitados);
        }
      );
  }

  private getNombreCreador(invitados: InvitadoWithRelations[]): string {
    const creador = invitados.find(invitado => invitado.creador);
    return creador.nombre;
  }

}
