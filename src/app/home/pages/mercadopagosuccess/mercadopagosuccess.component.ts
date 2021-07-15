import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AuthService, IUser } from 'src/app/auth/services/auth.service';
import { SuscripcionService } from '../../services/suscripcion.service';

@Component({
  selector: 'app-mercadopagosuccess',
  templateUrl: './mercadopagosuccess.component.html',
  styleUrls: ['./mercadopagosuccess.component.scss']
})
export class MercadoPagoSuccessComponent implements OnInit {
  // collection_id=1238674065
  // collection_status=approved
  // payment_id=1238674065
  // status=approved
  // external_reference=null
  // payment_type=credit_card
  // merchant_order_id=2952062562
  // preference_id=787698969-00a4018c-2aa0-4cda-ad01-ccba12ac23af
  // site_id=MLA
  // processing_mode=aggregator
  // merchant_account_id=null

  title: string;
  usuarioLogueado: IUser;
  loading = true;
  fechaHasta: Date;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private suscripcionService: SuscripcionService
  ) { }

  ngOnInit() {
    this.usuarioLogueado = this.authService.getLoggedUser();
    this.route.queryParams.subscribe(
      params => {
        console.log(params);
        if (params.status === 'approved') {
          this.suscripcionService.subscribe().subscribe(
            response => {
              this.fechaHasta = moment(response.fecha).add(1, 'month').toDate();
              this.title = `¡Felicitaciones ${this.usuarioLogueado.username}!`;
            }
          );
        }

        this.loading = false;
      }
    );
  }

}
