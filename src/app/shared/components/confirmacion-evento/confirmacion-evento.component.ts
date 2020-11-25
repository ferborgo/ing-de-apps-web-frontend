import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-confirmacion-evento',
  templateUrl: './confirmacion-evento.component.html',
  styleUrls: ['./confirmacion-evento.component.scss']
})
export class ConfirmacionEventoComponent implements OnInit, OnDestroy {

  @Output() siguiente = new EventEmitter<string>();

  url: string;
  password: string;

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.url = this.armarURL();
    this.password = this.eventoService.getPassword();
  }

  onURLClick(): void {
    this.router.navigateByUrl(this.armarURL());
  }

  onVolver(): void {
    this.siguiente.emit('nombre');
  }

  ngOnDestroy(): void {
    this.eventoService.resetAll();
  }

  private armarURL(): string {
    const id = this.eventoService.getNuevoEventoID();
    return `localhost:4200/eventos/${id}`;
  }

}
