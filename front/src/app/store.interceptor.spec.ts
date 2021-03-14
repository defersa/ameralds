import { TestBed } from '@angular/core/testing';

import { StoreInterceptor } from './store.interceptor';

describe('StoreInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StoreInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: StoreInterceptor = TestBed.inject(StoreInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
