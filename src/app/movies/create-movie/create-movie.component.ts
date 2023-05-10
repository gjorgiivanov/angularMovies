import { Component, OnInit } from '@angular/core';
import { movieCreationDTO, moviePostGetDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.moviesService
      .postGet()
      .subscribe((moviePostGetDTO: moviePostGetDTO) => {
        this.nonSelectedGenres = moviePostGetDTO.genres.map((genre) => {
          return <multipleSelectorModel>{ key: genre.id, value: genre.name };
        });

        this.nonSelectedMovieTheaters = moviePostGetDTO.movieTheaters.map(
          (movieTheater) => {
            return <multipleSelectorModel>{
              key: movieTheater.id,
              value: movieTheater.name,
            };
          }
        );
      });
  }

  nonSelectedGenres: multipleSelectorModel[] | undefined;
  nonSelectedMovieTheaters: multipleSelectorModel[] | undefined;

  saveChanges(movie: movieCreationDTO): void {
    this.moviesService
      .create(movie)
      .subscribe((id: number) => this.router.navigate(['/movies/' + id]));
  }
}
