import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barbeiros } from './barbeiros';

describe('Barbeiros', () => {
  let component: Barbeiros;
  let fixture: ComponentFixture<Barbeiros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barbeiros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Barbeiros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
