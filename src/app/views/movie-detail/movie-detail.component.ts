import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Movie } from '../../core/models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  animations: [
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' }),
        animate('220ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate('180ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' })
        )
      ])
    ])
  ]
})
export class MovieDetailComponent {
  @Input() movie!: Movie | null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
