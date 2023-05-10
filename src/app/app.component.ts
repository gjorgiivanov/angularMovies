import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-movies';

  handleRating(reating: number): void {
    alert(`The user selected ${reating} as reating`);
  }
}
