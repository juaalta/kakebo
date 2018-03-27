import { Component, OnInit } from "@angular/core";
import { GlobalStoreService } from "@tools/global/global-store.service";

@Component({
  selector: "kab-header",
  template: `
    <header>
      <a class="button button-clear" routerLink="">Kakebo</a>
      <a class="button button-clear" routerLink="about">About</a>
      <a *ngIf="userIsAnonymous;else wellcome" class="button button-clear" routerLink="credentials/login">Login</a>
      <ng-template #wellcome>Hello !</ng-template>
    </header>
    
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  public userIsAnonymous;
  constructor(private globalStore: GlobalStoreService) {}

  ngOnInit() {
    this.globalStore
      .selectUserIsAnonymous$()
      .subscribe(res => (this.userIsAnonymous = res));
  }
}
