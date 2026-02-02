import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  users: User[] = [];
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.selectAll('users').subscribe({
      next: (res) => {
          this.users = res as User[];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
