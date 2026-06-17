import { TestBed } from '@angular/core/testing';

import { Barbeiros } from './barbeiros';

describe('Barbeiros', () => {
  let service: Barbeiros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Barbeiros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
