import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private serverBase = 'http://localhost:3001/movies';
  private localAssets = 'assets/movies.json';
  private cache$?: Observable<Movie[]>;

  constructor(private http: HttpClient) {}

  /**
   * Получить все фильмы
   * Сначала пытается json-server, при ошибке — fallback на assets
   */
  getMovies(force = false): Observable<Movie[]> {
    if (!this.cache$ || force) {
      const fromServer$ = this.http.get<Movie[]>(this.serverBase)
        .pipe(
        catchError((err) => {
          console.warn('json-server недоступен, используем локальные assets:', err?.message ?? err);
          return throwError(() => err);
        })
      );

      this.cache$ = fromServer$
        .pipe(
        catchError(() =>
          this.http.get<{ movies: Movie[] }>(this.localAssets).pipe(
            map(payload => payload.movies || []),
            catchError((err2) => {
              console.error('Не удалось загрузить локальный файл movies.json', err2);
              return throwError(() => err2);
            })
          )
        ),
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return this.getMovies().pipe(
      map(movies => movies.find(m => m.id === id))
    );
  }

  searchMovies(q: string): Observable<Movie[]> {
    const term = (q || '').toLowerCase().trim();
    if (!term) {
      return this.getMovies();
    }
    return this.getMovies().pipe(
      map(movies =>
        movies.filter(m =>
          (m.title + ' ' + (m.description ?? '')).toLowerCase().includes(term)
        )
      )
    );
  }

  private handleError(err: any) {
    console.error('MovieService error', err);
    return throwError(() => err);
  }
}
