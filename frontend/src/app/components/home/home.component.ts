import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { TimesheetComponent } from '../timesheet/timesheet.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimesheetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

