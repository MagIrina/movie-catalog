import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _search$ = new BehaviorSubject<string>('');
  readonly search$ = this._search$.asObservable();

  setSearch(value: string) {
    this._search$.next(value);
  }

  clearSearch() {
    this._search$.next('');
  }
}
