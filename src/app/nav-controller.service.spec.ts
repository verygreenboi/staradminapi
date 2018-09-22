import { TestBed, inject } from '@angular/core/testing';

import { NavControllerService } from './nav-controller.service';

describe('NavControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavControllerService]
    });
  });

  it('should be created', inject([NavControllerService], (service: NavControllerService) => {
    expect(service).toBeTruthy();
  }));
});
