import { Component, OnInit } from '@angular/core';
import { MovieTheatersService } from '../movie-theaters.service';
import { movieTheatersDTO } from '../movie-theaters.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-movie-theater',
  templateUrl: './index-movie-theater.component.html',
  styleUrls: ['./index-movie-theater.component.css'],
})
export class IndexMovieTheaterComponent implements OnInit {
  constructor(
    private movieTheatersService: MovieTheatersService,
    private router: Router
  ) {}

  movieTheaters: movieTheatersDTO[] | undefined;
  columnsToDisplay = ['name', 'actions'];

  ngOnInit(): void {
    this.loadMovieTheaters();
  }

  private loadMovieTheaters() {
    this.movieTheatersService
      .get()
      .subscribe(
        (movieTheaters: movieTheatersDTO[]) =>
          (this.movieTheaters = movieTheaters)
      );
  }

  delete(id: number): void {
    this.movieTheatersService
      .delete(id)
      .subscribe(() => this.loadMovieTheaters());
  }
}
