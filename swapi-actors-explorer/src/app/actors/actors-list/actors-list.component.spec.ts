import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ActorsListComponent } from './actors-list.component';
import { ActorsService } from 'src/app/actors/services/actors.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { of, throwError } from 'rxjs';
import { ActorApiReponse } from 'src/types/actor.types';
import { PageEvent } from '@angular/material/paginator';
import { NavComponent } from 'src/app/shared/nav/nav.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ActorsListComponent', () => {
  let component: ActorsListComponent;
  let fixture: ComponentFixture<ActorsListComponent>;
  let actorsServiceSpy: jasmine.SpyObj<ActorsService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;
  const mockActorApiResponse: ActorApiReponse = {
    count: 10,
    results: [
      {
        id: '1',
        name: 'John Doe',
        age: 30,
        height: '78',
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
    ],
    next: '',
    previous: '',
  };
  const mockPageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 10 };

  beforeEach(async () => {
    const actorsService = jasmine.createSpyObj('ActorsService', [
      'getAllActors',
    ]);
    const errorService = jasmine.createSpyObj('ErrorService', ['handleError']);

    await TestBed.configureTestingModule({
      declarations: [ActorsListComponent],
      imports: [
        NavComponent,
        MatCardModule,
        MatPaginatorModule,
        AppRoutingModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: ActorsService, useValue: actorsService },
        { provide: ErrorService, useValue: errorService },
      ],
    }).compileComponents();

    actorsServiceSpy = TestBed.inject(
      ActorsService
    ) as jasmine.SpyObj<ActorsService>;
    errorServiceSpy = TestBed.inject(
      ErrorService
    ) as jasmine.SpyObj<ErrorService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when retrieving actors list', () => {
    const errorMessage = 'Error retrieving actors list';
    actorsServiceSpy.getAllActors.and.returnValue(throwError(errorMessage));
    console.log('here');

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    // Assert that actorsList is empty or remains unchanged
    expect(component.actorsList).toEqual([]);
    expect(component.totalActors).toEqual(0);
    expect(component.pageSize).toEqual(0);
    expect(errorServiceSpy.handleError).toHaveBeenCalledWith();
  });

  it('should handle page change', () => {
    actorsServiceSpy.getAllActors.and.returnValue(of(mockActorApiResponse));

    component.handlePageChange(mockPageEvent);

    expect(actorsServiceSpy.getAllActors).toHaveBeenCalledWith(1);
    expect(component.isLoading).toBeFalse();
    expect(component.actorsList).toEqual(mockActorApiResponse.results);
    expect(component.pageSize).toEqual(mockActorApiResponse.results.length);
  });

  it('should handle error when retrieving actors list', () => {
    const errorMessage = 'Error retrieving actors list';
    actorsServiceSpy.getAllActors.and.throwError(errorMessage);

    fixture.detectChanges();
    tick();
    expect(component.isLoading).toBeFalse();
    expect(errorServiceSpy.handleError).toHaveBeenCalled();
  });
});
