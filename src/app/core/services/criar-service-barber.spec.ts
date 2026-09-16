import { TestBed } from '@angular/core/testing';

import { CriarServiceBarber } from './criar-service-barber';

describe('CriarServiceBarber', () => {
  let service: CriarServiceBarber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarServiceBarber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
