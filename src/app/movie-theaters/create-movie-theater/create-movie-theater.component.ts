import { Component } from '@angular/core';
import { movieTheatersCreationDTO } from '../movie-theaters.model';
import { MovieTheatersService } from '../movie-theaters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie-theater',
  templateUrl: './create-movie-theater.component.html',
  styleUrls: ['./create-movie-theater.component.css'],
})
export class CreateMovieTheaterComponent {
  constructor(
    private movieTheatersService: MovieTheatersService,
    private router: Router
  ) {}

  saveChanges(movieTheater: movieTheatersCreationDTO): void {
    this.movieTheatersService
      .create(movieTheater)
      .subscribe(() => this.router.navigate(['/movietheaters']));
  }
}
