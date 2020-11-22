import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEventoComponent } from './config-evento.component';

describe('ConfigEventoComponent', () => {
  let component: ConfigEventoComponent;
  let fixture: ComponentFixture<ConfigEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
