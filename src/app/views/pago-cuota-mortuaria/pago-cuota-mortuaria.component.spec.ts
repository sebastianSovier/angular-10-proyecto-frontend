import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCuotaMortuariaComponent } from './pago-cuota-mortuaria.component';

describe('PagoCuotaMortuariaComponent', () => {
  let component: PagoCuotaMortuariaComponent;
  let fixture: ComponentFixture<PagoCuotaMortuariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoCuotaMortuariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCuotaMortuariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
