import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiaEstatalComponent } from './garantia-estatal.component';

describe('GarantiaEstatalComponent', () => {
  let component: GarantiaEstatalComponent;
  let fixture: ComponentFixture<GarantiaEstatalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarantiaEstatalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiaEstatalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
