import { TestBed } from '@angular/core/testing';

import { RetencionJudicialService } from './retencion-judicial.service';

describe('RetencionJudicialService', () => {
  let service: RetencionJudicialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetencionJudicialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
