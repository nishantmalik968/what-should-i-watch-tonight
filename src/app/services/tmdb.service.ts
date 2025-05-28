import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

const API_KEY = environment.tmdbApiKey;
const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  
  constructor(private http: HttpClient) {}

   getMoviesByGenre(genreId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: environment.tmdbApiKey,
        with_genres: genreId
      }
    });
  }

   searchMovies(query: string): Observable<any> {
    return this.http.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: environment.tmdbApiKey,
        query
      }
    });
  }

  searchPeople(query: string): Observable<any> {
    return this.http.get(`${BASE_URL}/search/person`, {
      params: {
        api_key: environment.tmdbApiKey,
        query
      }
    });
  }

   getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });
  }

  getMovieCredits(movieId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY
      }
    });
  }

  getMovieVideos(movieId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY
      }
    });
  }

  getSimilarMovies(movieId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/movie/${movieId}/similar`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    });
  }
}
