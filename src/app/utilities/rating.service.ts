import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiURL + '/ratings';

  rate(movieId: number, rating: number): Observable<any> {
    return this.http.post(this.apiUrl, { movieId, rating });
  }
}
