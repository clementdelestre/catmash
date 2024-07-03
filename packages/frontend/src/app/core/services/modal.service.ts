import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, TemplateRef, createComponent } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogs: ComponentRef<any>[] = []

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) { }

  showModal(title: string, template: TemplateRef<any>): ComponentRef<any> {

    const dialogRef = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      hostElement: document.getElementsByName('body')[0]
    });

    dialogRef.setInput('title', title);
    dialogRef.setInput('body', template);

    const sub = dialogRef.instance.onClose.subscribe(() => { this.closeModal(dialogRef); sub.unsubscribe() });

    //Disable scrolling on body
    document.body.style.overflow = 'hidden';

    document.body.appendChild(dialogRef.location.nativeElement);

    this.appRef.attachView(dialogRef.hostView);

    this.dialogs.push(dialogRef)

    return dialogRef
  }

  closeModal(dialog: ComponentRef<any>) {

    if (this.dialogs.includes(dialog)) {
      dialog.destroy();
      this.dialogs.splice(this.dialogs.indexOf(dialog), 1);
    }

    //Enable scrolling on body
    if(this.dialogs.length === 0){
      document.body.style.overflow = 'auto';
    }
  }
}
