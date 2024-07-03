import { Component, HostListener, TemplateRef, input, output } from '@angular/core';
import { modalAnimation } from '../../constants/animations.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    modalAnimation
  ]
})
export class ModalComponent {

  body = input.required<TemplateRef<any>>()
  title = input.required<string>()
  canDismiss = input<boolean>(true)

  onClose = output<void>()

  constructor() { }

  ngOnInit(): void {
    history.pushState(null, "modal", window.location.href);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.onClose.emit();
  }

  @HostListener('document:mousedown', ['$event'])
  clickOutside(event: any) {
    if (event.target.classList.contains("dialog-outside") && this.canDismiss()) {
      this.onClose.emit();
    }
  }

  ngOnDestroy() {
    if (history.state == null)
      history.back()
  }

}
