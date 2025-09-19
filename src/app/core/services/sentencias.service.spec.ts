import { TestBed } from '@angular/core/testing';

import { SentenciasService } from './sentencias.service';

describe('SentenciasService', () => {
  let service: SentenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
