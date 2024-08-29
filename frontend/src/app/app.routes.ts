import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { WorkstationComponent } from './components/pages/workstation/workstation.component';
import { TimecardComponent } from './components/pages/timecard/timecard.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'signin', component: SignInComponent},
    {path: 'workstations', component: WorkstationComponent, canActivate: [AuthGuard]},
    {path: 'timecard', component: TimecardComponent, canActivate: [AuthGuard]}
];
