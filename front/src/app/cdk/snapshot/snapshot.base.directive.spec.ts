import { ElementRef } from '@angular/core';
import { AmstoreSnapshotBaseDirective } from './snapshot.base.directive';

describe('SnapshotBaseDirective', () => {
  it('should create an instance', () => {
    const directive = new AmstoreSnapshotBaseDirective({} as ElementRef);
    expect(directive).toBeTruthy();
  });
});
