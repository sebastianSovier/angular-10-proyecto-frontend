import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetencionJudicialComponent } from './retencion-judicial.component';

describe('RetencionJudicialComponent', () => {
  let component: RetencionJudicialComponent;
  let fixture: ComponentFixture<RetencionJudicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetencionJudicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetencionJudicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
