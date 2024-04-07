import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorsService } from 'src/app/actors/services/actors.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Actor } from 'src/types/actor.types';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss'],
})
export class ActorDetailComponent implements OnInit{
  actorId: any = '';
  actor?: Actor;
  isLoading = true;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _errorService: ErrorService,
    private _actorsService: ActorsService
  ) {}

  ngOnInit(): void  {
    this.actorId = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this.actorId);

    this._actorsService.getActorDetail(this.actorId).subscribe({
      next: (response: Actor) => {
        this.actor = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this._errorService.handleError();
      },
    });
  }
}
