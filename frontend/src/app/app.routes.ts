import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { WorkstationComponent } from './components/pages/workstation/workstation.component';
import { TimecardComponent } from './components/timecard/timecard.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'workstations', component: WorkstationComponent},
    {path: 'timecard', component: TimecardComponent}
];
