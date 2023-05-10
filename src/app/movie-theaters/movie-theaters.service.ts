import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  movieTheatersCreationDTO,
  movieTheatersDTO,
} from './movie-theaters.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MovieTheatersService {
  constructor(private http: HttpClient) {}

  apiURL = environment.apiURL + '/movietheaters';

  get(): Observable<movieTheatersDTO[]> {
    return this.http.get<movieTheatersDTO[]>(this.apiURL);
  }

  getById(id: number): Observable<movieTheatersDTO> {
    return this.http.get<movieTheatersDTO>(`${this.apiURL}/${id}`);
  }

  create(movieTheater: movieTheatersCreationDTO): Observable<any> {
    return this.http.post(this.apiURL, movieTheater);
  }

  edit(id: number, movieTheater: movieTheatersCreationDTO): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, movieTheater);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
