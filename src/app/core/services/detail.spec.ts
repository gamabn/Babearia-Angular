import { TestBed } from '@angular/core/testing';

import { Detail } from './detail';

describe('Detail', () => {
  let service: Detail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Detail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
