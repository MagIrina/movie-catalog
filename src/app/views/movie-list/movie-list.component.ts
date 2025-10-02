import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import { Movie } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie.service';
import { SearchService } from '../../core/services/search.service';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent,
    MovieDetailComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  filtered$!: Observable<Movie[]>;
  loading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);
  selected$ = new BehaviorSubject<Movie | null>(null);

  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies().pipe(
      tap(() => this.loading$.next(false)),
      startWith([])
    );

    this.filtered$ = combineLatest([
      this.movies$,
      this.searchService.search$.pipe(
        debounceTime(250),
        distinctUntilChanged(),
        startWith('')
      )
    ]).pipe(
      map(([movies, q]) => {
        const query = (q || '').toLowerCase().trim();
        if (!query) return movies;
        return movies.filter(m =>
          (m.title + ' ' + (m.description || '')).toLowerCase().includes(query)
        );
      })
    );

    this.movies$.subscribe({
      next: () => this.error$.next(null),
      error: (err: any) => this.error$.next(err?.message || 'Ошибка при загрузке')
    });
  }

  trackById(index: number, item: Movie) {
    return item.id;
  }

  openDetail(movie: Movie) {
    this.selected$.next(movie);
  }

  closeDetail() {
    this.selected$.next(null);
  }
}
