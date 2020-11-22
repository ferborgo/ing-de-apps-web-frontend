import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesEventoComponent } from './opciones-evento.component';

describe('OpcionesEventoComponent', () => {
  let component: OpcionesEventoComponent;
  let fixture: ComponentFixture<OpcionesEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
