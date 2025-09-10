import { TestBed } from '@angular/core/testing';

import { Mondat } from './mondat';

describe('Mondat', () => {
  let service: Mondat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mondat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
