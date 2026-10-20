import { TestBed } from '@angular/core/testing';

import { AgendService } from './agend-service';

describe('AgendService', () => {
  let service: AgendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
