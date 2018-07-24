import { TestBed, inject } from '@angular/core/testing';

import { Referee } from './referee.service.service';

describe('Referee service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Referee]
    });
  });

  it('should be created', inject([Referee], (service: Referee) => {
    expect(service).toBeTruthy();
  }));
});
