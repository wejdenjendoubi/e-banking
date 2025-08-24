import { TestBed } from '@angular/core/testing';

import { Comptes } from './comptes';

describe('Comptes', () => {
  let service: Comptes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comptes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
