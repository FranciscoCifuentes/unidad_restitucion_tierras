import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SentenciasService } from './sentencias.service';

describe('SentenciasService', () => {
  let service: SentenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SentenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
