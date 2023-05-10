import { Component, OnInit } from '@angular/core';
import { ActorsService } from '../actors.service';
import { actorDTO } from '../actors.model';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css'],
})
export class IndexActorsComponent implements OnInit {
  constructor(private actorsService: ActorsService) {}

  ngOnInit(): void {
    this.loadActors();
  }

  actors: actorDTO[] | undefined;
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords: string | null | undefined;
  currentPage: number = 1;
  pageSize = 5;

  private loadActors() {
    this.actorsService
      .get(this.currentPage, this.pageSize)
      .subscribe((response: HttpResponse<actorDTO[]>) => {
        this.actors = response.body!;
        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  delete(id: number): void {
    this.actorsService.delete(id).subscribe(() => this.loadActors());
  }

  updatePagination(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadActors();
  }
}
