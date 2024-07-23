import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TimecardComponent } from './components/pages/timecard/timecard.component';
import { WorkstationComponent } from './components/pages/workstation/workstation.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    WorkstationComponent,
    TimecardComponent,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Timecard';
}
