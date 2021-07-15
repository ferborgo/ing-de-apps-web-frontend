import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { EventoControllerService } from './api/eventoController.service';
import { EventoInvitadoControllerService } from './api/eventoInvitadoController.service';
import { EventoOpcionControllerService } from './api/eventoOpcionController.service';
import { InvitadoControllerService } from './api/invitadoController.service';
import { InvitadoOpcionElegidaControllerService } from './api/invitadoOpcionElegidaController.service';
import { MercadopagoControllerService } from './api/mercadopagoController.service';
import { OpcionElegidaControllerService } from './api/opcionElegidaController.service';
import { OpcionOpcionElegidaControllerService } from './api/opcionOpcionElegidaController.service';
import { PingControllerService } from './api/pingController.service';
import { SuscripcionControllerService } from './api/suscripcionController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
