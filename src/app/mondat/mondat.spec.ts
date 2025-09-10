import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mondat } from './mondat';

describe('Mondat', () => {
  let component: Mondat;
  let fixture: ComponentFixture<Mondat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mondat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mondat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
