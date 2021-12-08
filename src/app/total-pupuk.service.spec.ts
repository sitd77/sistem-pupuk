import { TestBed } from '@angular/core/testing';

import { TotalPupukService } from './total-pupuk.service';

describe('TotalPupukService', () => {
  let service: TotalPupukService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalPupukService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
