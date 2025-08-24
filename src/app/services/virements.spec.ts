import { TestBed } from '@angular/core/testing';

import { Virements } from './virements';

describe('Virements', () => {
  let service: Virements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Virements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
