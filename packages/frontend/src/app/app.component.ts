import { Component, ComponentRef, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpdateSwService } from './core/services/update-sw.service';
import { ModalService } from './core/services/modal.service';
import { StorageKeys } from './core/constants/storage.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  welcomeModalComponent?: ComponentRef<any>
  @ViewChild('welcomeModalBody') welcomeModalBody!: TemplateRef<any>;

  constructor(private updateService: UpdateSwService, private readonly modalService: ModalService) { }

  ngOnInit() {
    this.updateService.checkForUpdates();
  }

  ngAfterViewInit() {
    if(!localStorage.getItem(StorageKeys.FIRST_LAUNCH)){
      this.welcomeModalComponent = this.modalService.showModal('', this.welcomeModalBody);
      localStorage.setItem(StorageKeys.FIRST_LAUNCH, '1')
    }
  }

  closeWelcomeModal() {
    this.modalService.closeModal(this.welcomeModalComponent!);
  }

}
