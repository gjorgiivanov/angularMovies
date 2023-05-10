import { Component } from '@angular/core';
import { userCredentials, authenticationResponse } from '../security.models';
import { SecurityService } from '../security.service';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  errors: string[] = [];

  register(userCredentials: userCredentials): void {
    this.errors = [];

    this.securityService.register(userCredentials).subscribe({
      next: (authenticationResponse: authenticationResponse) =>
        this.securityService.saveToken(authenticationResponse),
      complete: () => this.router.navigate(['/']),
      error: (error) => (this.errors = parseWebAPIErrors(error)),
    });
  }
}
