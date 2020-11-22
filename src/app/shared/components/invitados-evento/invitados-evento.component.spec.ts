import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadosEventoComponent } from './invitados-evento.component';

describe('InvitadosEventoComponent', () => {
  let component: InvitadosEventoComponent;
  let fixture: ComponentFixture<InvitadosEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitadosEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitadosEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
