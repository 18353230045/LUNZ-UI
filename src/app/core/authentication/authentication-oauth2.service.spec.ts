import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationOAuth2Service } from './authentication.service';

describe('AuthenticationOAuth2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationOAuth2Service]
    });
  });

  it('should be created', inject([AuthenticationOAuth2Service], (service: AuthenticationOAuth2Service) => {
    expect(service).toBeTruthy();
  }));
});
