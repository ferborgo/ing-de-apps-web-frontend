import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { EventoControllerService } from 'destino';
import { URLUtils } from 'src/app/shared/utils/url.utils';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'password', 'link', 'tipo', 'botones'];
  loading = true;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private service: EventoControllerService,
    private snak: MatSnackBar
  ) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.loading = true;
    this.service.eventoControllerFind().subscribe(
      response => {
        this.eventos = new MatTableDataSource(response);
        setTimeout(() => {
          this.eventos.paginator = this.paginator;
        }, 0);
        console.log(this.eventos);
        this.loading = false;
      }
    );
  }

  armarURL(id: string): string {
    return URLUtils.armarURL(id);
  }

  onEliminar(evento): void {
    this.service.eventoControllerDeleteById(evento.id).subscribe(
      () => {
        this.getEventos();
        this.snak.open(`Se eliminó el evento ${evento.nombre} satisfactoriamente`, '¡OK!', {
          duration: 2000,
          direction: 'ltr'
        });
      }
    );
  }

}
