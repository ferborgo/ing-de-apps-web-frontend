import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-shared-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  @Input() eventosCache: CalendarEvent[];

  forRefresh: Subject<any> = new Subject();
  viewDate: Date = new Date();

  // https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
  // https://angular-calendar.com/docs/components/CalendarWeekViewComponent.html#tooltipTemplate
  events: CalendarEvent[];

  constructor(
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    this.events = this.eventosCache;
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
    this.forRefresh.next();
  }

  private createEvent(id: number, start: Date, end: Date): CalendarEvent {
    return {
      id,
      start,
      end,
      title: `Opción ${id}`,
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

}
