import { Injectable } from '@angular/core';
import { MercadopagoControllerService } from 'destino';

let MercadoPago: any;

/**
 * C:\Users\ferbo>curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer APP_USR-8486011498416739-032322-a8aba1b763e83b08fd43cba2fe6c8dad-175812900" "https://api.mercadopago.com/users/test_user" -d "{\"site_id\":\"MLA\"}"
{"id":787698969,"nickname":"TETE9374008","password":"qatest139","site_status":"active","email":"test_user_55316014@testuser.com"}
 */

const usuarioVendedorPrueba = {
  email: 'test_user_55316014@testuser.com',
  password: 'qatest139'
};

const usuarioCompradorPrueba = {
  email: 'test_user_31984560@testuser.com',
  password: 'qatest7652'
};


/**
 * COMPRADOR:
 * C:\Users\ferbo>curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer APP_USR-8486011498416739-032322-a8aba1b763e83b08fd43cba2fe6c8dad-175812900" "https://api.mercadopago.com/users/test_user" -d "{\"site_id\":\"MLA\"}
{"id":791334200,"nickname":"TETE7651001","password":"qatest7652","site_status":"active","email":"test_user_31984560@testuser.com"}
 *
 */


@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  private publicKey = 'TEST-96245fe2-5944-4fc0-bd83-2aecbc8f4613';

  private publicKeyUsuarioPrueba = 'TEST-e8ae8461-00e4-4d41-adac-2d0b4d7dcbd9';

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
}
