import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { movieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-lsit',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    console.log(this.movies);
  }

  @Input()
  movies: movieDTO[] | undefined;

  @Output()
  onDelete = new EventEmitter<void>();

  removeMovie(id: number): void {
    this.moviesService.delete(id).subscribe(() => this.onDelete.emit());
  }
}
