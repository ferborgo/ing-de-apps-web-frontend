import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalendarComponent } from './components/calendar/calendar.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}



@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  exports: [
    CalendarComponent
  ]
})
export class SharedModule { }
