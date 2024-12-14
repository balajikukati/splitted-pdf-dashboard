import { TestBed } from '@angular/core/testing';

import { DataDashboardService } from './data-dashboard.service';

describe('DataDashboardService', () => {
  let service: DataDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
