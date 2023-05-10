import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  movieTheatersCreationDTO,
  movieTheatersDTO,
} from '../movie-theaters.model';
import {
  coordinatesMap,
  coordinatesMapWithMessage,
} from '../../utilities/map/coordinate';

@Component({
  selector: 'app-movie-theater-form',
  templateUrl: './movie-theater-form.component.html',
  styleUrls: ['./movie-theater-form.component.css'],
})
export class MovieTheaterFormComponent implements OnInit {
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', { validators: [Validators.required] }],
      latitude: ['', { validators: [Validators.required] }],
      longitude: ['', { validators: [Validators.required] }],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
      this.initialCoordinates.push({
        latitude: this.model.latitude,
        longitude: this.model.longitude,
        message: '',
      });
    }
  }

  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup | undefined;
  initialCoordinates: coordinatesMapWithMessage[] = [];

  @Input()
  model: movieTheatersDTO | undefined;

  @Output()
  onSaveChanges = new EventEmitter<movieTheatersCreationDTO>();

  saveChanges(): void {
    this.onSaveChanges.emit(this.form?.value);
  }

  onSelectLocation(coordinates: coordinatesMap): void {
    this.form?.patchValue(coordinates);
  }
}
