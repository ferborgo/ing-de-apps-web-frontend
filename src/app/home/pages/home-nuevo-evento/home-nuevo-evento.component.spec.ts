import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNuevoEventoComponent } from './home-nuevo-evento.component';

describe('HomeNuevoEventoComponent', () => {
  let component: HomeNuevoEventoComponent;
  let fixture: ComponentFixture<HomeNuevoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNuevoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNuevoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
