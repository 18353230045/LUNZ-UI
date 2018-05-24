import { TestBed, inject } from '@angular/core/testing';

import { HearFromsService } from './hear-froms.service';

describe('HearFromsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HearFromsService]
    });
  });

  it('should be created', inject([HearFromsService], (service: HearFromsService) => {
    expect(service).toBeTruthy();
  }));
});
