import { TestBed } from '@angular/core/testing';
import { ResultadoProviderService } from './resultado-provider.service';


describe('ResultadoProviderService', () => {
  let service: ResultadoProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
