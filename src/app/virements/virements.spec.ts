import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Virements } from './virements';

describe('Virements', () => {
  let component: Virements;
  let fixture: ComponentFixture<Virements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Virements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Virements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
