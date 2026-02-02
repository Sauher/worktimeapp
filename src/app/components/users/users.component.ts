import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, ButtonModule, ToggleSwitchModule, FormsModule, InputTextModule, InputIconModule, IconFieldModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
 @ViewChild('dt2') dt2: Table | undefined;
  users: User[] = [];
  filterValue: string = '';
  filterFields: string[] = ['name', 'email'];
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
          this.users.forEach(user => {
            user.status = Number(user.status) == 1 ? true : false;
          });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  handleInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value;
    this.dt2!.filterGlobal(this.filterValue, 'contains');
  }
}
