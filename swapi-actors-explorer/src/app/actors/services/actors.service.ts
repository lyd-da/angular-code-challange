import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor, ActorApiReponse } from 'src/types/actor.types';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private _actorsUrl = `${environment.apiUrl}/people` ;

  constructor(private _http: HttpClient) {}

  getAllActors(page: number) : Observable<any> {
    let params = new HttpParams().set('page', page);
    return this._http.get<ActorApiReponse>(this._actorsUrl, {params: params});
  }
  getActorDetail(id: string){
    return this._http.get<Actor>(`${this._actorsUrl}/${id}`);
  }
}
