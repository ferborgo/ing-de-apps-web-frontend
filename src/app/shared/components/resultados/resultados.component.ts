import { Component, Input, OnInit } from '@angular/core';
import { IInvitado } from '../../interfaces/invitado.interface';
import { days } from '../calendar/calendar.component';

@Component({
  selector: 'shared-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  @Input() evento: any;
  invitadosSinVotar: any[];
  opcionMasVotada: { id: string, cant: number };

  constructor() { }

  ngOnInit() {
  }

  invitadoVotoOpcion(invitado, opcion): boolean {
    if (! invitado.opcionElegidas) return false;
    else {
      return invitado.opcionElegidas.some(opcionElegida => opcionElegida.opcionId == opcion.id)
    }
  }

  generarTitulo(start: Date, end: Date): string {
    start = new Date(start);
    end = new Date(end);
    const dia = this.getDay(start.getDay());
    return `${dia} de ${start.getHours()}${this.getMinutes(start)} a ${end.getHours()}${this.getMinutes(end)}`;
  }

  private getDay(num: number): string {
    return days[num];
  }


  private getMinutes(date: Date): string {
    const minutes = date.getMinutes();
    if (minutes === 0) {
      return '';
    }
    return `:${minutes.toString()}`;
  }

  votosTotales(opcion): number {
    let cant = 0;
    this.evento.invitados.forEach(invitado => {
      if (invitado.opcionElegidas && invitado.opcionElegidas.some(a => a.opcionId == opcion.id)) {
        cant = cant + 1;
      }
    });

    if (! this.opcionMasVotada) {
      this.opcionMasVotada = {
        id: opcion.id,
        cant
      }
    } else {
      if (cant > this.opcionMasVotada.cant) {
        this.opcionMasVotada = {
          id: opcion.id,
          cant
        }
      }
    }

    return cant;
  }
}
