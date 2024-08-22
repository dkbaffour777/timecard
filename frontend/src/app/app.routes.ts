import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { WorkstationComponent } from './components/pages/workstation/workstation.component';
import { TimecardComponent } from './components/pages/timecard/timecard.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'signin', component: SignInComponent},
    {path: 'workstations', component: WorkstationComponent},
    {path: 'timecard', component: TimecardComponent}
];
