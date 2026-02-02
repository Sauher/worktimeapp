import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';
import { Table, TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, InputSwitchModule, FormsModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  @ViewChild('dt2') dt2!: Table;
  users: User[] = [];
  filterValue: string = '';
  filterFields: string[] = ['name', 'email'];

  constructor(
    private api:ApiService
  ){}

  ngOnInit(): void {
      this.getUsers();
  }

  getUsers(){
    this.api.selectAll('users').subscribe({
      next: (res)=>{
         this.users = res as User[];
         this.users.forEach(user => {
          user.status = (user.status) ? true : false
         });
      },
      error: (err)=>{
        console.log(err.error.error)
      }
    });
  }

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value;
    this.dt2.filterGlobal((this.filterValue), 'contains');
  }

}
