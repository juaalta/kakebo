import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableEvent } from '@angular/service-worker/src/low_level';

@Injectable()
export class PwaService {

  constructor(private swUpate: SwUpdate) { }

  checkForUpdates() {
    this.swUpate.available.subscribe(
      (event: UpdateAvailableEvent) => {
        const message1 = `Update available: current version is ${event.current}, available version is ${event.available}.`;
        const message2 = ' Would you like to update?';
        const value = confirm(message1 + message2);

        if (value) {
          location.reload();
        }
      }
    );
  }

}
