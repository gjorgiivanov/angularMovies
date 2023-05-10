import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { movieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { genreDTO } from 'src/app/genres/genres.model';
import { GenresService } from '../../genres/genres.service';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css'],
})
export class MovieFilterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private genresService: GenresService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false,
    });

    this.initaialFormValues = this.form.value;

    this.filterMovies(this.form.value);

    this.genresService.getAll().subscribe((genres: genreDTO[]) => {
      this.genres = genres;
      this.form?.valueChanges.subscribe((values) => {
        this.filterMovies(values);
      });
    });
  }

  form: FormGroup | undefined;

  movies: movieDTO[] | undefined;
  genres: genreDTO[] | undefined;

  currentPage = 1;
  recordsPerPage = 10;
  totalAmountOfRecords: number | undefined;

  initaialFormValues: any | undefined;

  filterMovies(values: any): void {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;

    this.moviesService
      .filter(values)
      .subscribe((response: HttpResponse<movieDTO[]>) => {
        if (response.body) {
          this.movies = response.body;
          if (response.headers.get('totalAmountOfRecords')) {
            this.totalAmountOfRecords = Number(
              response.headers.get('totalAmountOfRecords')
            );
          }
        }
      });
  }

  clearForm(): void {
    this.form?.patchValue(this.initaialFormValues);
  }

  paginatorUpdate(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;

    this.filterMovies(this.form?.value);
  }

  onDelete(): void {
    this.filterMovies(this.form?.value);
  }
}
