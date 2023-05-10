import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { genreCreationDTO } from '../genres.model';
import { GenresService } from '../genres.service';
import { parseWebAPIErrors } from '../../utilities/utils';

@Component({
  selector: 'app-create-genres',
  templateUrl: './create-genres.component.html',
  styleUrls: ['./create-genres.component.css'],
})
export class CreateGenresComponent {
  constructor(private router: Router, private genresService: GenresService) {}

  errors: string[] = [];

  saveChanges(genreCreationDTO: genreCreationDTO): void {
    this.genresService.create(genreCreationDTO).subscribe({
      complete: () => {
        this.router.navigate(['/genres']);
      },
      error: (error) => (this.errors = parseWebAPIErrors(error)),
    });
  }
}
