/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnggotaService } from './anggota.service';

describe('Service: Anggota', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnggotaService]
    });
  });

  it('should ...', inject([AnggotaService], (service: AnggotaService) => {
    expect(service).toBeTruthy();
  }));
});
