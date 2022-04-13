import { TestBed } from '@angular/core/testing';

import { ShareKeyService } from './share-key.service';

describe('ShareKeyService', () => {
  let service: ShareKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
