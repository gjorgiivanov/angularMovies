import { actorsMoviesDTO } from '../actors/actors.model';
import { genreDTO } from '../genres/genres.model';
import { movieTheatersDTO } from '../movie-theaters/movie-theaters.model';

export interface movieCreationDTO {
  title: string;
  summary: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate: Date;
  poster: File;
  genresIds: number[];
  movieTheatersIds: number[];
  actors: actorsMoviesDTO[];
}

export interface movieDTO {
  id: number;
  title: string;
  summary: string;
  inTheaters: boolean;
  trailer: string;
  releaseDate: Date;
  poster: string;
  genres: genreDTO[];
  movieTheaters: movieTheatersDTO[];
  actors: actorsMoviesDTO[];
  averageVote: number;
  userVote: number;
}

export interface moviePostGetDTO {
  genres: genreDTO[];
  movieTheaters: movieTheatersDTO[];
}

export interface moviePutGetDTO {
  movie: movieDTO;
  selectedGenres: genreDTO[];
  nonSelectedGenres: genreDTO[];
  selectedMovieTheaters: movieTheatersDTO[];
  nonSelectedMovieTheaters: movieTheatersDTO[];
  actors: actorsMoviesDTO[];
}

export interface homeDTO {
  inTheaters: movieDTO[];
  upcomingReleases: movieDTO[];
  averageVote: number;
}
