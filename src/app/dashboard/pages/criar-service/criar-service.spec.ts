import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarService } from './criar-service';

describe('CriarService', () => {
  let component: CriarService;
  let fixture: ComponentFixture<CriarService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
