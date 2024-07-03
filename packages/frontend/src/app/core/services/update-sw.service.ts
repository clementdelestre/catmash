import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateSwService {

  constructor(private swUpdate: SwUpdate) { }

  public checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then((update: boolean) => {
        if (update) {
          this.swUpdate.activateUpdate().then(() => {
            window.location.reload();
          })
        }
      })
    }
  }
}
