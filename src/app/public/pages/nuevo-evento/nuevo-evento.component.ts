import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';

export enum toggles {
  NOMBRE = 'nombre',
  OPCIONES = 'opciones',
  INVITADOS = 'invitados',
  CONFIG = 'config',
  CONFIRMACION = 'confirmacion'
}

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.scss']
})
export class NuevoEventoComponent implements OnInit {

  private toggleMap: Map<string, boolean>;
  private ultimoActivo: string;
  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.toggleMap = this.initToggles();
    this.ultimoActivo = toggles.NOMBRE;
  }

  private initToggles(): Map<string, boolean> {
    const map = new Map<string, boolean>();
    map.set(toggles.NOMBRE, true);
    map.set(toggles.OPCIONES, false);
    map.set(toggles.INVITADOS, false);
    map.set(toggles.CONFIG, false);
    map.set(toggles.CONFIRMACION, false);
    return map;
  }

  mostrar(opcion: string): boolean {
    return this.toggleMap.get(opcion);
  }

  onSiguiente(event): void {
    this.toggleMap.set(this.ultimoActivo, false);
    this.toggleMap.set(event, true);
    this.ultimoActivo = event;
  }

  getAll() {
    this.eventoService.example();
  }

}
