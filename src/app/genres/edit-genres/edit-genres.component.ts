import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genreCreationDTO, genreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-edit-genres',
  templateUrl: './edit-genres.component.html',
  styleUrls: ['./edit-genres.component.css'],
})
export class EditGenresComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private genresService: GenresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.genresService.getById(params.id).subscribe((genre) => {
        this.model = genre;
      });
    });
  }

  model: genreDTO | undefined;

  saveChanges(genreCreationDTO: genreCreationDTO): void {
    this.genresService.edit(this.model!.id, genreCreationDTO).subscribe({
      complete: () => this.router.navigate(['/genres']),
    });
  }
}
