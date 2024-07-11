import { TestBed } from '@angular/core/testing';

import { WorkstationSharedDataService } from './workstation-shared-data.service';

describe('WorkstationSharedDataService', () => {
  let service: WorkstationSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkstationSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
