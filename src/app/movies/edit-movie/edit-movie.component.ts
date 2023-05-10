import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { movieCreationDTO, movieDTO, moviePutGetDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { multipleSelectorModel } from '../../utilities/multiple-selector/multiple-selector.model';
import { actorsMoviesDTO } from 'src/app/actors/actors.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService
        .putGet(params['id'])
        .subscribe((putgetDTO: moviePutGetDTO) => {
          this.model = putgetDTO.movie;

          this.selectedGenres = this.genericMultipleSelectorModelMapper(
            putgetDTO.selectedGenres
          );
          this.nonSelectedGenres = this.genericMultipleSelectorModelMapper(
            putgetDTO.nonSelectedGenres
          );

          this.selectedMovieTheaters = this.genericMultipleSelectorModelMapper(
            putgetDTO.selectedMovieTheaters
          );
          this.nonSelectedMovieTheaters =
            this.genericMultipleSelectorModelMapper(
              putgetDTO.nonSelectedMovieTheaters
            );

          this.selectedActors = putgetDTO.actors;
        });
    });
  }

  model: movieDTO | undefined;
  selectedGenres: multipleSelectorModel[] = [];
  nonSelectedGenres: multipleSelectorModel[] = [];
  selectedMovieTheaters: multipleSelectorModel[] = [];
  nonSelectedMovieTheaters: multipleSelectorModel[] = [];
  selectedActors: actorsMoviesDTO[] = [];

  saveChanges(movie: movieCreationDTO) {
    this.moviesService.edit(this.model!.id, movie).subscribe(() => {
      this.router.navigate(['/movies/' + this.model!.id]);
    });
  }

  private genericMultipleSelectorModelMapper(
    list: any[]
  ): multipleSelectorModel[] {
    var multipleSelector: multipleSelectorModel[] = [];

    if (list && list.length > 0) {
      multipleSelector = list.map((item) => {
        return <multipleSelectorModel>{
          key: item.id,
          value: item.name,
        };
      });
    }

    return multipleSelector;
  }
}
