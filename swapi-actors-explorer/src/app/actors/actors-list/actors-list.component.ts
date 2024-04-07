import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActorsService } from 'src/app/actors/services/actors.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Actor, ActorApiReponse } from 'src/types/actor.types';
@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.scss'],
})
export class ActorsListComponent {
  actorsList: Actor[] = [];
  isLoading = true;
  totalActors = 0;
  pageSize = 0;
  page = 1;
  constructor(
    private _actorService: ActorsService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this._actorService.getAllActors(this.page).subscribe({
      next: (response: ActorApiReponse) => {
        console.log(response);
        this.actorsList = response.results;
        this.pageSize = this.actorsList.length;
        this.totalActors = response.count;
        this.isLoading = false;
      },
      error: (error) => {
        // setTimeout(() => this._errorService.handleError(), 2000);
        this.actorsList = [];
        this.pageSize = 0;
        this.totalActors = 0;
        this.isLoading = false;
        this._errorService.handleError();
      },
    });
  }
  handlePageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;

    this._actorService.getAllActors(this.page).subscribe({
      next: (response: ActorApiReponse) => {
        console.log(response);
        this.actorsList = response.results;
        this.pageSize = this.actorsList.length;
        this.isLoading = false;
      },
      error: (error) => {
        // Simulate a network error (for demonstration)
        // setTimeout(() => this._errorService.handleError( ), 2000);
        this._errorService.handleError();
      },
    });
  }
}
