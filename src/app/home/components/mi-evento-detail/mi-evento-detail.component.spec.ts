import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiEventoDetailComponent } from './mi-evento-detail.component';

describe('MiEventoDetailComponent', () => {
  let component: MiEventoDetailComponent;
  let fixture: ComponentFixture<MiEventoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiEventoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiEventoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
