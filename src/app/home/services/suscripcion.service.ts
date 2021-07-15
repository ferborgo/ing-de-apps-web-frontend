import { Injectable } from '@angular/core';
import { Suscripcion, SuscripcionControllerService } from 'destino';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(
    private service: SuscripcionControllerService
  ) { }

  subscribe(): Observable<Suscripcion> {
    return this.service.suscripcionControllerCreateSuscripcion();
  }

  getSuscripciones(): Observable<Suscripcion[]> {
    return this.service.suscripcionControllerFindForUser();
  }

  isMonthPaid(): Observable<boolean> {
    return this.service.suscripcionControllerMesPago();
  }
}
