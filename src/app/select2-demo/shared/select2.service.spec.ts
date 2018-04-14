import { TestBed, inject } from '@angular/core/testing';

import { Select2Service } from './select2.service';

describe('Select2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Select2Service]
    });
  });

  it('should be created', inject([Select2Service], (service: Select2Service) => {
    expect(service).toBeTruthy();
  }));
});
