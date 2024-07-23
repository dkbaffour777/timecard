import { TestBed } from '@angular/core/testing';

import { BreakLogService } from './break-log.service';

describe('BreakLogService', () => {
  let service: BreakLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
