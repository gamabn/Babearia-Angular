import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Months } from './months';

describe('Months', () => {
  let component: Months;
  let fixture: ComponentFixture<Months>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Months]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Months);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
