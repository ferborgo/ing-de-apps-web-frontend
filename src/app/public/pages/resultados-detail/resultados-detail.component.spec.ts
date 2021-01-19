import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosDetailComponent } from './resultados-detail.component';

describe('ResultadosDetailComponent', () => {
  let component: ResultadosDetailComponent;
  let fixture: ComponentFixture<ResultadosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
