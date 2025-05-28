import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;
  let activatedRouteStub: any;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: () => '123'  
        }
      }
    };

    const tmdbSpy = jasmine.createSpyObj('TmdbService', [
      'getMovieDetails',
      'getMovieCredits',
      'getMovieVideos',
      'getSimilarMovies'
    ]);

    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: TmdbService, useValue: tmdbSpy },
        DomSanitizer
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    tmdbServiceSpy = TestBed.inject(TmdbService) as jasmine.SpyObj<TmdbService>;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie data and set component properties', () => {
    const mockDetail = {
      id: 123,
      genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }]
    };

    const mockCredits = {
      cast: [
        { id: 1, name: 'Actor 1', profile_path: '/actor1.jpg' },
        { id: 2, name: 'Actor 2', profile_path: null }, 
        { id: 3, name: 'Actor 3', profile_path: '/actor3.jpg' },
        { id: 4, name: 'Actor 4', profile_path: '/actor4.jpg' },
        { id: 5, name: 'Actor 5', profile_path: '/actor5.jpg' },
        { id: 6, name: 'Actor 6', profile_path: '/actor6.jpg' },
        { id: 7, name: 'Actor 7', profile_path: '/actor7.jpg' }
      ]
    };

    const mockVideos = {
      results: [
        { id: 'v1', key: 'trailer_key', site: 'YouTube', type: 'Trailer' },
        { id: 'v2', key: 'clip_key', site: 'YouTube', type: 'Clip' }
      ]
    };

    const mockSimilar = {
      results: [
        { id: 101, poster_path: '/sim1.jpg' },
        { id: 102, poster_path: null }, 
        { id: 103, poster_path: '/sim3.jpg' },
        { id: 104, poster_path: '/sim4.jpg' },
        { id: 105, poster_path: '/sim5.jpg' },
        { id: 106, poster_path: '/sim6.jpg' },
        { id: 107, poster_path: '/sim7.jpg' },
        { id: 108, poster_path: '/sim8.jpg' },
        { id: 109, poster_path: '/sim9.jpg' }
      ]
    };

    tmdbServiceSpy.getMovieDetails.and.returnValue(of(mockDetail));
    tmdbServiceSpy.getMovieCredits.and.returnValue(of(mockCredits));
    tmdbServiceSpy.getMovieVideos.and.returnValue(of(mockVideos));
    tmdbServiceSpy.getSimilarMovies.and.returnValue(of(mockSimilar));

    component.fetchMovieData();

    expect(component.movieDetails).toEqual(mockDetail);

    expect(component.cast.length).toBe(6);
    expect(component.cast.every(c => c.profile_path)).toBeTrue();

    expect(component.similarMovies.length).toBe(8);
    expect(component.similarMovies.every(m => m.poster_path)).toBeTrue();

    expect(component.trailerUrl).toBe('https://www.youtube.com/embed/trailer_key');
  });

  it('should return joined genre names', () => {
    component.movieDetails = {
      genres: [
        { id: 1, name: 'Comedy' },
        { id: 2, name: 'Romance' }
      ]
    };
    expect(component.genreNames).toBe('Comedy, Romance');

    component.movieDetails = { genres: [] };
    expect(component.genreNames).toBe('');

    component.movieDetails = null;
    expect(component.genreNames).toBe('');
  });
});
