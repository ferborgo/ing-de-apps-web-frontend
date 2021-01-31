import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventoService } from '../../services/evento.service';

export enum days {
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
}

@Component({
  selector: 'app-shared-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {



  @Input() eventosCache: CalendarEvent[];

  forRefresh: Subject<any> = new Subject();
  viewDate: Date = new Date();

  horaComienzo = '8';
  horaFinal = '23';

  // https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
  // https://angular-calendar.com/docs/components/CalendarWeekViewComponent.html#tooltipTemplate
  events: CalendarEvent[];

  eventoSeleccionado: CalendarEvent;

  activeDayIsOpen = true;
  view = CalendarView.Week;
  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.events = this.eventosCache;
  }

  onEventoClick(event) {
    if (this.eventoSeleccionado === event.event) {
      this.eventoSeleccionado = null;
    } else {
      this.eventoSeleccionado = event.event;
    }
  }

  onBorrarEvento() {
    const event = this.eventoSeleccionado;
    const index = this.events.findIndex(each => Number(each.id) === Number(event.id));
    this.events.splice(index, 1);
    this.events.forEach(each => {
      if (each.id >= event.id) {
        each.id = Number(each.id) - 1;
      }
    });
    console.log(this.events);
    this.forRefresh.next();
    this.eventoSeleccionado = null;
  }

  onHourSegmentClick(event) {
    const comienzo = new Date(event.date);
    const final = new Date(event.date);
    final.setHours(comienzo.getHours() + 2);
    const nuevoEvento: CalendarEvent = this.createEvent(this.nextID(), comienzo, final);
    this.addEvent(nuevoEvento);
  }

  onEventTimeChange(event) {
    const evento = this.events.find(each => Number(each.id) === Number(event.event.id));
    evento.start = event.newStart;
    evento.end = event.newEnd;
    evento.title = this.generarTitulo(evento.start, evento.end);
    this.forRefresh.next();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private createEvent(id: number, start: Date, end: Date): CalendarEvent {
    const titulo = this.generarTitulo(start, end);
    return {
      id,
      start,
      end,
      title: `${titulo}`,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };
  }

  private addEvent(nuevoEvento: CalendarEvent): void {
    this.events.push(nuevoEvento);
    this.forRefresh.next();
  }

  private nextID(): number {
    if (! this.events || this.events.length === 0) {
      return 1;
    }
    const ids = this.events.map(event => Number(event.id));
    return Math.max(...ids) + 1;
  }


  ngOnDestroy() {
    this.eventoService.setOpciones(this.events);
  }

  private generarTitulo(start: Date, end: Date): string {
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

}
