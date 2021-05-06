/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermohonanService } from './permohonan.service';

describe('Service: Permohonan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermohonanService]
    });
  });

  it('should ...', inject([PermohonanService], (service: PermohonanService) => {
    expect(service).toBeTruthy();
  }));
});
