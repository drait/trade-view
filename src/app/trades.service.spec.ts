import { TestBed, inject } from '@angular/core/testing';

import { TradesService } from './trades.service';

describe('TradesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradesService]
    });
  });

  it('should be created', inject([TradesService], (service: TradesService) => {
    expect(service).toBeTruthy();
  }));
});
