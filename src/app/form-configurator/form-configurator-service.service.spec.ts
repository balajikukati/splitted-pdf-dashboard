import { TestBed } from '@angular/core/testing';

import { FormConfiguratorServiceService } from './form-configurator-service.service';

describe('FormConfiguratorServiceService', () => {
  let service: FormConfiguratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormConfiguratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
