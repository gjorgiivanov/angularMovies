import { Injectable } from '@angular/core';
import {
  authenticationResponse,
  userCredentials,
  userDTO,
} from './security.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private http: HttpClient, private router: Router) {}

  private readonly apiURL = environment.apiURL + '/accounts';
  private readonly tokenKey = 'token';
  private readonly expirationTokenKey = 'token-expitation';
  private readonly roleField = 'role';

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const expiration = localStorage.getItem(this.expirationTokenKey);

    if (!token || !expiration) {
      return false;
    }
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  getRole(): string {
    return this.getFieldFromJWT(this.roleField);
  }

  register(
    userCredentials: userCredentials
  ): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(
      `${this.apiURL}/create`,
      userCredentials
    );
  }

  login(userCredentials: userCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(
      `${this.apiURL}/login`,
      userCredentials
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
    this.router.navigate(['login']);
  }

  getUsers(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('recordsPerPage', recordsPerPage);

    return this.http.get<userDTO[]>(`${this.apiURL}/listusers`, {
      observe: 'response',
      params: params,
    });
  }

  makeAdmin(userId: string): Observable<boolean> {
    const headers = new HttpHeaders('Content-Type: application/json');

    return this.http.post<boolean>(
      `${this.apiURL}/makeadmin`,
      JSON.stringify(userId),
      {
        headers: headers,
      }
    );
  }

  removeAdmin(userId: string): Observable<any> {
    const headers = new HttpHeaders('Content-Type: application/json');

    return this.http.post(
      `${this.apiURL}/removeadmin`,
      JSON.stringify(userId),
      {
        headers: headers,
      }
    );
  }

  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);

    if (!token) {
      return '';
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));

    return dataToken[field];
  }

  saveToken(authenticationResponse: authenticationResponse): void {
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(
      this.expirationTokenKey,
      authenticationResponse.expiration.toString()
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
