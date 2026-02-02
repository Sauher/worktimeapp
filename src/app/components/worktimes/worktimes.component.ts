import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { WorkTime } from '../../interfaces/worktime';
import { ApiService } from '../../services/api.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worktimes',
  standalone: true,
  imports: [SelectModule,FormsModule],
  templateUrl: './worktimes.component.html',
  styleUrl: './worktimes.component.scss'
})
export class WorktimesComponent {
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
      },
      error: (err) => {
        console.error(err.error.error);
      }
    });
 }
}
