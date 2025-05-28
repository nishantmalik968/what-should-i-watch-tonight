import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { TmdbService } from '../../services/tmdb.service';
import { of } from 'rxjs';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TmdbService', [
      'getMoviesByGenre',
      'searchMovies',
      'searchPeople'
    ]);

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [{ provide: TmdbService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    tmdbServiceSpy = TestBed.inject(TmdbService) as jasmine.SpyObj<TmdbService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies when mood is selected', () => {
    const mockResponse = { results: [{ id: 1, title: 'Feel Good Movie', poster_path: '/path.jpg' }] };
    tmdbServiceSpy.getMoviesByGenre.and.returnValue(of(mockResponse));

    component.selectMood('Feel Good');

    expect(component.selectedMood).toBe('Feel Good');
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toBe('Feel Good Movie');
    expect(component.isSearching).toBe(false);
  });

  it('should clear search when search term is empty', () => {
    component.searchMoviesResults = [{ id: 1 }];
    component.searchPeopleResults = [{ id: 2 }];
    component.hasSearched = true;

    component.onSearchTermChange('   ');

    expect(component.hasSearched).toBe(false);
    expect(component.searchMoviesResults.length).toBe(0);
    expect(component.searchPeopleResults.length).toBe(0);
  });

  it('should perform search and set results', () => {
    const mockMovies = {
      results: [
        { id: 1, title: 'Batman Begins', poster_path: '/batman.jpg' },
        { id: 2, title: 'No Poster Movie', poster_path: null }
      ]
    };

    const mockPeople = {
      results: [
        { id: 1, name: 'Christian Bale', profile_path: '/profile.jpg' },
        { id: 2, name: 'No Profile', profile_path: null },
        { id: 3, name: 'Actor 3', profile_path: '/p3.jpg' },
        { id: 4, name: 'Actor 4', profile_path: '/p4.jpg' },
        { id: 5, name: 'Actor 5', profile_path: '/p5.jpg' },
        { id: 6, name: 'Actor 6', profile_path: '/p6.jpg' },
        { id: 7, name: 'Actor 7', profile_path: '/p7.jpg' }
      ]
    };

    tmdbServiceSpy.searchMovies.and.returnValue(of(mockMovies));
    tmdbServiceSpy.searchPeople.and.returnValue(of(mockPeople));

    component.searchTerm = 'batman';
    component.onSearch();

    expect(component.hasSearched).toBe(true);
    expect(component.selectedMood).toBeNull();
    expect(component.searchMoviesResults.length).toBe(1); 
    expect(component.searchPeopleResults.length).toBe(6); 
    expect(component.isSearching).toBe(false);
  });
});
