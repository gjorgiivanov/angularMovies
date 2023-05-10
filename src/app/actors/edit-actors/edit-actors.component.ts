import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreationDTO, actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actors',
  templateUrl: './edit-actors.component.html',
  styleUrls: ['./edit-actors.component.css'],
})
export class EditActorsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private actorsService: ActorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.actorsService.getById(params['id']).subscribe((actor: actorDTO) => {
        this.model = actor;
      });
    });
  }

  model: actorDTO | undefined;

  saveChanges(actorCreationDTO: actorCreationDTO): void {
    this.actorsService.edit(this.model!.id, actorCreationDTO).subscribe({
      complete: () => this.router.navigate(['/actors']),
    });
  }
}
