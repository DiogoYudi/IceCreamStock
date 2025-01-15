import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { saleResolver } from './sale.resolver';

describe('saleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => saleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
