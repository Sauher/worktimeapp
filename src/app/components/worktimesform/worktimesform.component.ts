import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-worktimesform',
  standalone: true,
  imports: [RouterModule,ButtonModule],
  templateUrl: './worktimesform.component.html',
  styleUrl: './worktimesform.component.scss'
})
export class WorktimesformComponent {

  save() {
    // Implement save logic here
  }
}
