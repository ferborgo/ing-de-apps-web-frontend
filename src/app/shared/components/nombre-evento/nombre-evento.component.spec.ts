import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreEventoComponent } from './nombre-evento.component';

describe('NombreEventoComponent', () => {
  let component: NombreEventoComponent;
  let fixture: ComponentFixture<NombreEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
