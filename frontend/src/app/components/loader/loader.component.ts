import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
  }
}
