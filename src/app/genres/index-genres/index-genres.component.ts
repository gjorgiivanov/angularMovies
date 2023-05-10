import { Component, OnInit } from '@angular/core';
import { GenresService } from '../genres.service';
import { genreDTO } from '../genres.model';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css'],
})
export class IndexGenresComponent implements OnInit {
  constructor(private genreService: GenresService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  genres: genreDTO[] | undefined;
  columnsToDisplay = ['name', 'actions'];

  loadGenres() {
    this.genreService.getAll().subscribe((genres) => {
      this.genres = genres;
    });
  }

  deleteGenre(id: number): void {
    this.genreService.delete(id).subscribe(() => this.loadGenres());
  }
}
