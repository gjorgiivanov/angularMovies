import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  movieCreationDTO,
  movieDTO,
  moviePostGetDTO,
  homeDTO,
  moviePutGetDTO,
} from './movies.model';
import { formatDateFormData } from '../utilities/utils';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  apiURL = environment.apiURL + '/movies';

  getHomePageMovies(): Observable<homeDTO> {
    return this.http.get<homeDTO>(this.apiURL);
  }

  postGet(): Observable<moviePostGetDTO> {
    return this.http.get<moviePostGetDTO>(`${this.apiURL}/postget`);
  }

  putGet(id: number): Observable<moviePutGetDTO> {
    return this.http.get<moviePutGetDTO>(`${this.apiURL}/putget/${id}`);
  }

  getById(id: number): Observable<movieDTO> {
    return this.http.get<movieDTO>(`${this.apiURL}/${id}`);
  }

  filter(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });

    return this.http.get(`${this.apiURL}/filter`, {
      params: params,
      observe: 'response',
    });
  }

  create(movie: movieCreationDTO): Observable<number> {
    const formData = this.buildFormData(movie);
    return this.http.post<number>(this.apiURL, formData);
  }

  edit(id: number, movie: movieCreationDTO): Observable<any> {
    const formData = this.buildFormData(movie);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  buildFormData(movie: movieCreationDTO): FormData {
    const formData = new FormData();

    formData.append('title', movie.title);
    if (movie.summary) {
      formData.append('summary', movie.summary);
    }
    if (movie.inTheaters) {
      formData.append('inTheaters', String(movie.inTheaters));
    }
    if (movie.trailer) {
      formData.append('trailer', movie.trailer);
    }
    if (movie.releaseDate) {
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }
    if (movie.poster) {
      formData.append('poster', movie.poster);
    }

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }
}
