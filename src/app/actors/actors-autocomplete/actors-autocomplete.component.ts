import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorDTO, actorsMoviesDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css'],
})
export class ActorsAutocompleteComponent implements OnInit {
  constructor(private actorsService: ActorsService) {}

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.actorsService
        .searchByName(value)
        .subscribe((actors: actorsMoviesDTO[]) => {
          this.actorsToDisplay = actors;
        });
    });
  }

  control: FormControl = new FormControl();

  actorsToDisplay: actorsMoviesDTO[] = [];

  @Input()
  selectedActors: actorsMoviesDTO[] = [];

  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  @ViewChild(MatTable)
  table: MatTable<any> | undefined;

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.control.patchValue('');
    const actorSelected: actorsMoviesDTO = event.option.value;
    const isInSelectedIndex = this.selectedActors.findIndex(
      (actor) => actor.id == actorSelected.id
    );

    if (isInSelectedIndex !== -1) {
      return;
    }

    this.selectedActors.push(actorSelected);
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  remove(element: any): void {
    const index = this.selectedActors.findIndex(
      (actor) => actor.name === element.name
    );
    this.selectedActors.splice(index, 1);
    this.table?.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>): void {
    const previousIndex = this.selectedActors.findIndex(
      (actor) => actor === event.item.data
    );
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table?.renderRows();
  }
}
