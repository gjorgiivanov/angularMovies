import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { toBase64 } from '../utils';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css'],
})
export class InputImgComponent {
  imageBase64: string | undefined;

  @Output()
  onImageSelected = new EventEmitter<File>();

  @Input()
  urlCurrentImage: string | null | undefined;

  change(event: any): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      toBase64(file).then((value) => {
        this.imageBase64 = value?.toString();
      });
      this.onImageSelected.emit(file);
      this.urlCurrentImage = null;
    }
  }
}
