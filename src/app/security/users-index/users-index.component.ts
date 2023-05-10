import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { userDTO } from '../security.models';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css'],
})
export class UsersIndexComponent implements OnInit {
  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  users: userDTO[] | undefined | null;
  page = 1;
  recordsPerPage = 5;
  totalAmountOfRecords: string | undefined | null;
  columnsToDisplay = ['email', 'actions'];

  private loadUsers() {
    this.securityService
      .getUsers(this.page, this.recordsPerPage)
      .subscribe((response: HttpResponse<userDTO[]>) => {
        this.users = response.body;
        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  makeAdmin(userId: string): void {
    this.securityService.makeAdmin(userId).subscribe((isCreated) => {
      if (isCreated) {
        Swal.fire(
          'Success',
          'The user was successfully added as an admin',
          'success'
        );
      } else {
        Swal.fire('Error', 'The user is already an admin', 'error');
      }
    });
  }

  removeAdmin(userId: string): void {
    this.securityService.removeAdmin(userId).subscribe((isRemoved) => {
      if (isRemoved) {
        Swal.fire(
          'Success',
          'The user was successfully removed as an admin',
          'success'
        );
      } else {
        Swal.fire('Error', 'The user is not an admin', 'error');
      }
    });
  }

  updatePagination(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.loadUsers();
  }
}
