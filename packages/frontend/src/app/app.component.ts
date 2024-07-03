import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpdateSwService } from './core/services/update-sw.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private updateService: UpdateSwService) { }

  ngOnInit() {
    this.updateService.checkForUpdates();
  }
  
}
