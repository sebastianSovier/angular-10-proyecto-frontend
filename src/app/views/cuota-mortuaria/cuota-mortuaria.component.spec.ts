import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaMortuariaComponent } from './cuota-mortuaria.component';

describe('CuotaMortuariaComponent', () => {
  let component: CuotaMortuariaComponent;
  let fixture: ComponentFixture<CuotaMortuariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotaMortuariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotaMortuariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
