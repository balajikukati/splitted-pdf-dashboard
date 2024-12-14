import { TestBed } from '@angular/core/testing';

import { DataStatusService } from './data-status.service';

describe('DataStatusService', () => {
  let service: DataStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
