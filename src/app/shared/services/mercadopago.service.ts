import { Injectable } from '@angular/core';
import { MercadopagoControllerService } from 'destino';

let MercadoPago: any;

@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  constructor(
    private mp: MercadopagoControllerService
  ) { }

  comprar() {

    this.mp.mercadopagoControllerCreate({
      description: 'Suscripción mensual',
      price: 150,
      quantity: 1
    }).subscribe(
      res => {
        console.log('RES MP Backend: ', res);
        window.location.href = res.response.init_point;
      }
    );

  }

  default() {
    this.mp.mercadopagoControllerCreateDefault().subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }
}
