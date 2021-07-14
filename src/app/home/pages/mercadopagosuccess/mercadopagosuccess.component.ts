import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, IUser } from 'src/app/auth/services/auth.service';

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

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.usuarioLogueado = this.authService.getLoggedUser();
    this.route.queryParams.subscribe(
      params => {
        console.log(params);
        if (params.status === 'approved') {
          // TO-DO: actualizar en backend.
          this.title = `¡Felicitaciones ${this.usuarioLogueado.username}!`;
        }

        this.loading = false;
      }
    );
  }

}
