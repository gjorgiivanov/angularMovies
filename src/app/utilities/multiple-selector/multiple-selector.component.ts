import { Component, Input } from '@angular/core';
import { multipleSelectorModel } from './multiple-selector.model';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.css'],
})
export class MultipleSelectorComponent {
  @Input()
  selectedItems: multipleSelectorModel[] = [];

  @Input()
  nonSelectedItems: multipleSelectorModel[] = [];

  selectAll(): void {
    this.selectedItems.push(...this.nonSelectedItems);
    this.nonSelectedItems = [];
  }

  deSelectAll(): void {
    this.nonSelectedItems.push(...this.selectedItems);
    this.selectedItems = [];
  }

  select(item: multipleSelectorModel, index: number): void {
    this.selectedItems.push(item);
    this.nonSelectedItems.splice(index, 1);
  }

  deSelect(item: multipleSelectorModel, index: number): void {
    this.nonSelectedItems.push(item);
    this.selectedItems.splice(index, 1);
  }
}
