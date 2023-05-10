import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreationDTO, actorDTO } from '../actors.model';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css'],
})
export class FormActorComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      dateOfBirth: '',
      picture: '',
      biography: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  form: FormGroup | undefined;

  @Input()
  model!: actorDTO;
  @Output()
  onSaveChanges = new EventEmitter<actorCreationDTO>();

  saveChanges(): void {
    this.onSaveChanges.emit(this.form?.value);
  }

  onImageSelected(image: File): void {
    this.form?.get('picture')?.setValue(image);
  }

  changeMakdown(content: string): void {
    this.form?.get('biography')?.setValue(content);
  }
}
