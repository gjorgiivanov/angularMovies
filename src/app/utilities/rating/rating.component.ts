import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
    this.previousStar = this.selectedStar;
  }

  @Input()
  maxRating = 5;
  @Input()
  selectedStar = 0;
  previousStar = 0;
  @Output()
  onReating: EventEmitter<number> = new EventEmitter<number>();
  maxRatingArr: any[] | undefined;

  handleMouseEnter(index: number): void {
    this.selectedStar = index + 1;
  }

  handleMouseLeave(index: number): void {
    if (this.previousStar !== 0) {
      this.selectedStar = this.previousStar;
    } else {
      this.selectedStar = 0;
    }
  }

  rate(index: number): void {
    if (this.securityService.isAuthenticated()) {
      this.selectedStar = index + 1;
      this.previousStar = this.selectedStar;
      this.onReating.emit(this.selectedStar);
    } else {
      Swal.fire('Error', 'You need to be logedin before voting', 'error');
    }
  }
}
