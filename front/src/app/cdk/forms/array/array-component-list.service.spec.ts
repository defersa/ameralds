import { TestBed } from '@angular/core/testing';

import { ArrayComponentListService } from './array-component-list.service';

describe('ArrayComponentListService', () => {
  let service: ArrayComponentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayComponentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
