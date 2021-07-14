import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPagoSuccessComponent } from './mercadopagosuccess.component';

describe('MercadopagosuccessComponent', () => {
  let component: MercadoPagoSuccessComponent;
  let fixture: ComponentFixture<MercadoPagoSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoPagoSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPagoSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
