import { Component, Input } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.css'],
})
export class AuthorizeViewComponent {
  constructor(private securityService: SecurityService) {}

  @Input()
  role: string | undefined;

  isAuthorized(): boolean {
    if (this.role) {
      return this.securityService.getRole() === this.role;
    } else {
      return this.securityService.isAuthenticated();
    }
  }
}
