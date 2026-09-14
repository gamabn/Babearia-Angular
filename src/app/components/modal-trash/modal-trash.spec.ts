import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrash } from './modal-trash';

describe('ModalTrash', () => {
  let component: ModalTrash;
  let fixture: ComponentFixture<ModalTrash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTrash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTrash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
