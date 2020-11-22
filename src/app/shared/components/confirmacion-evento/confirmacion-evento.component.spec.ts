import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionEventoComponent } from './confirmacion-evento.component';

describe('ConfirmacionEventoComponent', () => {
  let component: ConfirmacionEventoComponent;
  let fixture: ComponentFixture<ConfirmacionEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
