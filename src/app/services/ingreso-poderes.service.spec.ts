import { TestBed } from '@angular/core/testing';

import { IngresoPoderesService } from './ingreso-poderes.service';

describe('IngresoPoderesService', () => {
  let service: IngresoPoderesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoPoderesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
