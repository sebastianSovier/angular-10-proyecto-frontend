import { TestBed } from '@angular/core/testing';

import { GarantiaEstatalService } from './garantia-estatal.service';

describe('GarantiaEstatalService', () => {
  let service: GarantiaEstatalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarantiaEstatalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
