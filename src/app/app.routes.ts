import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { WorktimesComponent } from './components/worktimes/worktimes.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LogoutComponent } from './components/logout/logout.component';
import { WorktimesformComponent } from './components/worktimesform/worktimesform.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'worktimes',
        children: [
            { path: '', component: WorktimesComponent },
            { path: 'new', component: WorktimesformComponent },
            { path: ':id', component: WorktimesformComponent }
        ]
    },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
