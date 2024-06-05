import { TestBed } from '@angular/core/testing';

import { StaffprofileService } from './staffprofile.service';

describe('StaffprofileService', () => {
  let service: StaffprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
