import { TestBed } from '@angular/core/testing';

import { UserDetailsDialogService } from './user-details-dialog.service';

describe('UserDetailsDialogService', () => {
  let service: UserDetailsDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
