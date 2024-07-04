import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TimesheetComponent } from '../timesheet/timesheet.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, TimesheetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

