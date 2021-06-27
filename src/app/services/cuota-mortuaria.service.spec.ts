import { TestBed } from '@angular/core/testing';

import { CuotaMortuariaService } from './cuota-mortuaria.service';

describe('CuotaMortuariaService', () => {
  let service: CuotaMortuariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuotaMortuariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
