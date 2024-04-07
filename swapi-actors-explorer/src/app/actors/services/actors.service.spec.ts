import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Actor, ActorApiReponse } from 'src/types/actor.types';
import { ActorsService } from './actors.service';

describe('ActorsService', () => {
  let service: ActorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActorsService],
    });

    service = TestBed.inject(ActorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllActors', () => {
    it('should return an Observable<ActorApiReponse>', () => {
      const mockResponse: ActorApiReponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            id: '1',
            name: 'John Doe',
            age: 30,
            height: '',
            mass: '',
            hair_color: '',
            skin_color: '',
            eye_color: '',
            birth_year: '',
            gender: '',
            homeworld: '',
            films: [],
            species: [],
            vehicles: [],
            starships: [],
            created: '',
            edited: '',
            url: '',
          },
        ], // Add a mock actor
      };

      const page = 1;

      service.getAllActors(page).subscribe((response: any) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['_actorsUrl']}?page=${page}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getActorDetail', () => {
    it('should return an Observable<Actor>', () => {
      const mockActorId = '1';
      const mockActor: Actor = {
        id: '1',
        name: 'John Doe',
        age: 30,
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: '',
      }; // Add a mock actor

      service.getActorDetail(mockActorId).subscribe((response: any) => {
        expect(response).toEqual(mockActor);
      });

      const req = httpMock.expectOne(`${service['_actorsUrl']}/${mockActorId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockActor);
    });
  });
});
