import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ActorDetailComponent } from './actor-detail.component';
import { ActorsService } from 'src/app/actors/services/actors.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Actor } from 'src/types/actor.types';
import { NavComponent } from 'src/app/shared/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

describe('ActorDetailComponent', () => {
  let component: ActorDetailComponent;
  let fixture: ComponentFixture<ActorDetailComponent>;
  let actorsServiceSpy: jasmine.SpyObj<ActorsService>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;
  const actorId = '1';
  const mockActor: Actor = {
    id: '1', name: 'John Doe', age: 30,
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
    url: ''
  };

  beforeEach(async () => {
    const actorsService = jasmine.createSpyObj('ActorsService', ['getActorDetail']);
    const errorService = jasmine.createSpyObj('ErrorService', ['handleError']);

    await TestBed.configureTestingModule({
      declarations: [ActorDetailComponent],
      imports:[NavComponent, MatIconModule, AppRoutingModule, MatCardModule,MatListModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: actorId }) } } },
        { provide: ActorsService, useValue: actorsService },
        { provide: ErrorService, useValue: errorService }
      ]
    }).compileComponents();

    actorsServiceSpy = TestBed.inject(ActorsService) as jasmine.SpyObj<ActorsService>;
    errorServiceSpy = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    
  });

  beforeEach(() => {
  
    fixture = TestBed.createComponent(ActorDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with actor details', () => {
    actorsServiceSpy.getActorDetail.and.returnValue(of(mockActor));

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.actor).toEqual(mockActor);
  });

  it('should handle error when retrieving actor details', () => {
    const errorMessage = 'Error retrieving actor details';
    actorsServiceSpy.getActorDetail.and.throwError(errorMessage);

    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(errorServiceSpy.handleError).toHaveBeenCalled();

  });

});

