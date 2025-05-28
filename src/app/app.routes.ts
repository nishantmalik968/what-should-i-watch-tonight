import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];
