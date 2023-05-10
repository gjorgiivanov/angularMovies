import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUppercase';
import { genreCreationDTO } from '../genres.model';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.css'],
})
export class FormGenreComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            firstLetterUppercase(),
          ],
        },
      ],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  form: FormGroup | undefined;

  @Input()
  model: genreCreationDTO | undefined;

  @Output()
  onSaveChanges: EventEmitter<genreCreationDTO> =
    new EventEmitter<genreCreationDTO>();

  saveChanges(): void {
    this.onSaveChanges.emit(this.form?.value);
  }

  getErrorMessage(): string {
    const field = this.form!.get('name');

    if (field?.hasError('required')) {
      return 'The name filed is required';
    }
    if (field?.hasError('minlength')) {
      return 'The minimum lenth is: 3';
    }
    if (field?.hasError('firstLetterUppercase')) {
      return field.getError('firstLetterUppercase').message;
    }
    return '';
  }
}
