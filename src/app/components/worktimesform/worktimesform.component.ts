import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { User } from '../../interfaces/user';
import { DatePicker } from 'primeng/datepicker';
import { WorkTime } from '../../interfaces/worktime';
import { ApiService } from '../../services/api.service';
import moment from 'moment';

@Component({
  selector: 'app-worktimesform',
  standalone: true,
  imports: [RouterModule,ButtonModule,SelectModule,FormsModule,DatePicker],
  templateUrl: './worktimesform.component.html',
  styleUrl: './worktimesform.component.scss'
})
export class WorktimesformComponent implements OnInit {
  selectedUser: User | null = null;
  users: User[] = []; 
  worktime: WorkTime = {
    userId: '',
    date: new Date(),
    start: '',
    end: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
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
      },
      error: (err) => {
        console.error(err.error.error);
      }
    });
  }

  save() {
    let data: WorkTime = {
      userId: this.selectedUser?.id || '',
      date: moment(this.worktime.date).format('YYYY-MM-DD'),
      start: moment(this.worktime.start, 'HH:mm').format('HH:mm'),
      end: moment(this.worktime.end, 'HH:mm').format('HH:mm')
    };
    this.api.insert('worktimes', data).subscribe({
      next: (res) => {
        console.log('Worktime saved successfully:', res);
      },
      error: (err) => {
        console.error('Error saving worktime:', err.error.error);
      }
    });
  }
}
