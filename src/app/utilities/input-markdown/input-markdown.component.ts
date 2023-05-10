import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css'],
})
export class InputMarkdownComponent {
  @Input()
  markdownContent = '';

  @Input()
  label = 'Value';

  @Output()
  changeMakdown = new EventEmitter<string>();

  onChangeMarkdown(event: any): void {
    this.changeMakdown.emit(event.target.value);
  }
}
