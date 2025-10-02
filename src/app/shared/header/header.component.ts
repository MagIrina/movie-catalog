import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  query = '';
  private sub?: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.sub = this.searchService.search$.subscribe(q => this.query = q ?? '');
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onInput(value: string) {
    this.searchService.setSearch(value ?? '');
  }

  onClear() {
    this.query = '';
    this.searchService.clearSearch();
  }
}
