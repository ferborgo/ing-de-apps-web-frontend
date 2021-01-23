import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoControllerService } from 'destino';

@Component({
  selector: 'app-mi-evento-detail',
  templateUrl: './mi-evento-detail.component.html',
  styleUrls: ['./mi-evento-detail.component.scss']
})
export class MiEventoDetailComponent implements OnInit {

  @Input() evento: any;
  @Output() salir = new EventEmitter();
  urlInvitados: string;

  error: string;

  constructor() { }

  ngOnInit() {
    this.urlInvitados = this.armarURL();
  }

  onVolver(): void {
    this.salir.emit(true);
  }

  private armarURL(): string {
    const id = this.evento.id;
    return `localhost:4200/eventos/${id}`;
  }

}
