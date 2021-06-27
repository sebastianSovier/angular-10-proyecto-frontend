import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPoderesComponent } from './ingreso-poderes.component';

describe('IngresoPoderesComponent', () => {
  let component: IngresoPoderesComponent;
  let fixture: ComponentFixture<IngresoPoderesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoPoderesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoPoderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
