import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { homeDTO, movieDTO } from '../movies/movies.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.loadMovies();
  }

  moviesTheater: movieDTO[] | undefined;
  moviesFuture: movieDTO[] | undefined;

  private loadMovies() {
    this.moviesService.getHomePageMovies().subscribe((homeDTO: homeDTO) => {
      this.moviesTheater = homeDTO.inTheaters;
      this.moviesFuture = homeDTO.upcomingReleases;
    });
  }

  onDelete(): void {
    this.loadMovies();
  }
}
