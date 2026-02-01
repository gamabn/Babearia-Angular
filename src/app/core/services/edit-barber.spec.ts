import { TestBed } from '@angular/core/testing';

import { EditBarber } from './edit-barber';

describe('EditBarber', () => {
  let service: EditBarber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBarber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
