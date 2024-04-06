import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActorsService } from './actors.service';

describe('ActorsService', () => {
  let service: ActorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActorsService]
    });
    service = TestBed.inject(ActorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});