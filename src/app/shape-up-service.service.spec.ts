import { TestBed } from '@angular/core/testing';

import { ShapeUpServiceService } from './shape-up-service.service';

describe('ShapeUpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShapeUpServiceService = TestBed.get(ShapeUpServiceService);
    expect(service).toBeTruthy();
  });
});
