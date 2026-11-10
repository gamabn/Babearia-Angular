import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Week } from './week';

describe('Week', () => {
  let component: Week;
  let fixture: ComponentFixture<Week>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Week]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Week);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
