import { TestBed } from '@angular/core/testing';

import { ProfissionalProviderService } from './profissional-provider.service';

describe('ProfissionalProviderService', () => {
  let service: ProfissionalProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfissionalProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
