import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEventoFormComponent } from './nuevo-evento-form.component';

describe('NuevoEventoFormComponent', () => {
  let component: NuevoEventoFormComponent;
  let fixture: ComponentFixture<NuevoEventoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoEventoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEventoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
