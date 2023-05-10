import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { movieDTO, movieCreationDTO } from '../movies.model';
import { multipleSelectorModel } from '../../utilities/multiple-selector/multiple-selector.model';
import { actorsMoviesDTO } from 'src/app/actors/actors.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css'],
})
export class FormMovieComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', { validators: [Validators.required] }],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresIds: '',
      movieTheatersIds: '',
      actors: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  form: FormGroup | undefined;

  @Input()
  selectedGenres: multipleSelectorModel[] = [];
  @Input()
  nonSelectedGenres: multipleSelectorModel[] = [];

  @Input()
  selectedMovieTheaters: multipleSelectorModel[] = [];
  @Input()
  nonSelectedMovieTheaters: multipleSelectorModel[] = [];

  @Input()
  selectedActors: actorsMoviesDTO[] = [];

  @Input()
  model: movieDTO | undefined;

  @Output()
  onSaveChanges = new EventEmitter<movieCreationDTO>();

  saveChanges(): void {
    const selectedGenresIds = this.selectedGenres.map((genre) => genre.key);
    this.form?.get('genresIds')?.setValue(selectedGenresIds);

    const selectedMovieTheatersIds = this.selectedMovieTheaters.map(
      (theater) => theater.key
    );
    this.form?.get('movieTheatersIds')?.setValue(selectedMovieTheatersIds);

    const actors = this.selectedActors.map((actor: actorsMoviesDTO) => {
      return <actorsMoviesDTO>{ id: actor.id, character: actor.character };
    });
    this.form?.get('actors')?.setValue(actors);

    this.onSaveChanges.emit(this.form?.value);
  }

  onImageSelected(file: File): void {
    this.form?.get('poster')?.setValue(file);
  }

  changeMarkdown(content: string): void {
    this.form?.get('summary')?.setValue(content);
  }
}
