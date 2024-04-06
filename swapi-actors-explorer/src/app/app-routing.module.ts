import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsListComponent } from './actors/actors-list/actors-list.component';
import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {
    path: 'list',
    component: ActorsListComponent,
  },
  {
    path: 'detail/:id',
    component: ActorDetailComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list',
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
