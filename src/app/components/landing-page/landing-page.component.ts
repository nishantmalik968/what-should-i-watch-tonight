import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  moodToGenreMap: Record<string, number> = {
    'Feel Good': 35,
    'Action Fix': 28,
    'Mind Benders': 878
  };
  moods = Object.keys(this.moodToGenreMap);


  selectedMood: string | null = null;
  movies: any[] = [];

  searchTerm = '';
  hasSearched = false;
  searchMoviesResults: any[] = [];
  searchPeopleResults: any[] = [];

  isSearching = false;  

  constructor(private tmdbService: TmdbService) { }

  selectMood(mood: string) {
    this.resetSearch();
    this.isSearching = true;
    this.selectedMood = mood;
    const genreId = this.moodToGenreMap[mood];
    this.tmdbService.getMoviesByGenre(genreId).subscribe(res => {
      this.movies = res.results;
      this.isSearching = false;
    });
  }

  onSearchTermChange(term: string) {
    this.searchTerm = term;
    if (!term.trim()) {
     
      this.resetSearch();
      this.hasSearched = false;
    }
  }

  onSearch() {
    const q = this.searchTerm.trim();
    if (!q) return;


    this.hasSearched = true;
    this.selectedMood = null;
    this.movies = [];
    this.isSearching = true;
    this.resetSearch();

    forkJoin({
      movies: this.tmdbService.searchMovies(q),
      people: this.tmdbService.searchPeople(q)
    }).subscribe(({ movies, people }) => {
      this.searchMoviesResults = movies.results
        .filter((movie: any) => movie.poster_path);
      this.searchPeopleResults = people.results
        .filter((p: any) => p.profile_path)
        .slice(0, 6);
      this.isSearching = false;
    });
  }

  private resetSearch() {
    this.searchMoviesResults = [];
    this.searchPeopleResults = [];
    this.isSearching = false;
  }
}