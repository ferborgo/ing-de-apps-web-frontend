import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  forRefresh: Subject<any> = new Subject();
  viewDate: Date = new Date();

  // https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
  // https://angular-calendar.com/docs/components/CalendarWeekViewComponent.html#tooltipTemplate
  events: CalendarEvent[] = [
    this.createEvent(1, new Date(2020, 8, 10, 15, 0), new Date(2020, 8, 10, 17, 0)),
    this.createEvent(2, new Date(2020, 8, 11, 8, 0), new Date(2020, 8, 11, 17, 0))
  ];

  constructor() { }

  ngOnInit() {
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
    const ids = this.events.map(event => Number(event.id));
    return Math.max(...ids) + 1;
  }

}
