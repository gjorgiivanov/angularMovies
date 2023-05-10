import { Component } from '@angular/core';
import { actorCreationDTO } from '../actors.model';
import { ActorsService } from '../actors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-actors',
  templateUrl: './create-actors.component.html',
  styleUrls: ['./create-actors.component.css'],
})
export class CreateActorsComponent {
  constructor(private actorService: ActorsService, private router: Router) {}

  saveChanges(actorCreationDTO: actorCreationDTO) {
    this.actorService
      .create(actorCreationDTO)
      .subscribe(() => this.router.navigate(['/actors']));
  }
}
