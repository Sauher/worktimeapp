import { Component, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user';
import { WorkTime } from '../../interfaces/worktime';
import { ApiService } from '../../services/api.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-worktimes',
  standalone: true,
  imports: [SelectModule,RouterModule,ButtonModule,FormsModule,TableModule,InputIconModule,InputTextModule,InputSwitchModule,IconFieldModule],
  templateUrl: './worktimes.component.html',
  styleUrl: './worktimes.component.scss'
})
export class WorktimesComponent {
  @ViewChild('dt2') dt2!: Table;
  filterValue: string = '';
  filterFields: string[] = ['name', 'email'];
 users: User[] = [];
 selectedUser: User | null = null;
 worktimes: WorkTime[] = [];
 constructor(private api: ApiService) {}
 ngOnInit(): void {
   this.getUsers();
 }

 getUsers() {
    this.api.selectAll('users').subscribe({
      next: (res) => {
        this.users = res as User[];
        this.users.forEach(user => {
          user.name = user.name + ' (' + user.email + ')';
        });
        this.users.sort((a, b) => a.name.localeCompare(b.name));
        this.getWorkTimes(null);
      },
      error: (err) => {
        console.error(err.error.error);
      }
    });
 }
 getWorkTimes(id: string | null) {
   if (id){
    this.api.selectByField('worktimes', 'userId','eq',id).subscribe({
      next: (res) => {
        this.worktimes = res as WorkTime[];
        this.worktimes.forEach(worktime => {
          worktime.date = moment(worktime.date).format('YYYY-MM-DD');
          worktime.user = this.users.find(u => u.id == worktime.userId) || null;
        });

        console.log(this.worktimes);
      },
      error: (err) => {
        console.error(err.error.error);
      }
    });
   }
   else{
    this.api.selectAll('worktimes').subscribe({
      next: (res) => {
        this.worktimes = res as WorkTime[];
        this.worktimes.forEach(worktime => {
          worktime.date = moment(worktime.date).format('YYYY-MM-DD');
          worktime.user = this.users.find(u => u.id == worktime.userId) || null;
        });

        console.log(this.worktimes);
      },
      error: (err) => {
        console.error(err.error.error);
      }
    });
   }
 }
 ChangeUsers() {
   if (this.selectedUser) {
     this.getWorkTimes(this.selectedUser.id);
   } else {
     this.getWorkTimes(null);
   }
 }
 deleteWorktime(id: string) {
   this.api.delete('worktimes', id).subscribe({
     next: (res) => {
       console.log('Worktime deleted successfully:', res);
       this.getWorkTimes(this.selectedUser!.id);
     },
     error: (err) => {
       console.error('Error deleting worktime:', err.error.error);
     }
   });
 }
   handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value;
    this.dt2.filterGlobal((this.filterValue), 'contains');
  }
}
