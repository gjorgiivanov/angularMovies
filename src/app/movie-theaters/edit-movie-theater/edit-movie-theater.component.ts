import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTheatersService } from '../movie-theaters.service';
import {
  movieTheatersCreationDTO,
  movieTheatersDTO,
} from '../movie-theaters.model';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css'],
})
export class EditMovieTheaterComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieTheatersService: MovieTheatersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.movieTheatersService
        .getById(params['id'])
        .subscribe(
          (movieTheater: movieTheatersDTO) => (this.model = movieTheater)
        );
    });
  }

  model: movieTheatersDTO | undefined;

  saveChanges(movieTheater: movieTheatersCreationDTO): void {
    this.movieTheatersService
      .edit(this.model!.id, movieTheater)
      .subscribe(() => this.router.navigate(['/movietheaters']));
  }
}
