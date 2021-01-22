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

  error: string;

  constructor(
    private route: ActivatedRoute,
    private service: EventoControllerService
  ) { }

  ngOnInit() {
  }

  onVolver(): void {
    this.salir.emit(true);
  }

}
