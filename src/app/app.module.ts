import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from 'destino';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TokenService } from './auth/services/token.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ApiModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
