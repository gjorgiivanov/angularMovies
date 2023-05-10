import { Component } from '@angular/core';
import { SecurityService } from '../security.service';
import { userCredentials, authenticationResponse } from '../security.models';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  errors: string[] = [];

  login(userCredentials: userCredentials): void {
    this.errors = [];

    this.securityService.login(userCredentials).subscribe({
      next: (authenticationResponse: authenticationResponse) => {
        this.securityService.saveToken(authenticationResponse);
      },
      complete: () => this.router.navigate(['/']),
      error: (error) => (this.errors = parseWebAPIErrors(error)),
    });
  }
}
