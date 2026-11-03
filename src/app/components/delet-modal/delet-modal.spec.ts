import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletModal } from './delet-modal';

describe('DeletModal', () => {
  let component: DeletModal;
  let fixture: ComponentFixture<DeletModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
