import { Component, Input, OnInit } from '@angular/core';
import { IInvitado } from '../../interfaces/invitado.interface';

@Component({
  selector: 'shared-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  @Input() evento: any;
  invitadosSinVotar: any[];

  constructor() { }

  ngOnInit() {
  }

  invitadoVotoOpcion(invitado, opcion): boolean {
    if (! invitado.opcionElegidas) return false;
    else {
      return invitado.opcionElegidas.some(opcionElegida => opcionElegida.opcionId == opcion.id)
    }
  }

  votosTotales(opcion): number {
    let cant = 0;
    this.evento.invitados.forEach(invitado => {
      if (invitado.opcionElegidas && invitado.opcionElegidas.some(a => a.opcionId == opcion.id)) {
        cant = cant + 1;
      }
    });
    return cant;
  }
}
