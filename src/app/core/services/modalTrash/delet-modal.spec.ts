import { TestBed } from '@angular/core/testing';

import { DeletModal } from './delet-modal';

describe('DeletModal', () => {
  let service: DeletModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
