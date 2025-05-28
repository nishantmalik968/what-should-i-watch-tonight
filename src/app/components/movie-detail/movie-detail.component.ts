import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  movieId!: string;
  movieDetails: any;
  cast: any[] = [];
  trailerUrl: string = '';
  similarMovies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.fetchMovieData();
  }

  fetchMovieData(): void {
    forkJoin({
      detail: this.tmdb.getMovieDetails(this.movieId),
      credits: this.tmdb.getMovieCredits(this.movieId),
      videos: this.tmdb.getMovieVideos(this.movieId),
      similar: this.tmdb.getSimilarMovies(this.movieId)
    }).subscribe((data: any) => {
      this.movieDetails = data.detail;
      this.cast = data.credits.cast.filter((p:any) => p.profile_path).slice(0, 6);
      this.similarMovies = data.similar.results.filter((p:any) => p.poster_path).slice(0, 8);

      const trailer = data.videos.results.find(
        (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    });
  }

  get genreNames(): string {
  return this.movieDetails?.genres?.map((g: any) => g.name).join(', ') || '';
}
}
