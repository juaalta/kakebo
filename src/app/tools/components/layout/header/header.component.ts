import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "@tools/global/state";
import { Observable } from "rxjs/Observable";
import { User } from "@tools/global/state/user/models/user.model";

@Component({
  selector: "kab-header",
  template: `
    <header class="container">
      <a class="button button-clear" routerLink="">Kakebo</a>
      <a class="button button-clear" routerLink="about">About</a>
      <a *ngIf="user?.userIsAnonymous ;else wellcome" class="button button-clear" routerLink="credentials/login">Login</a>
      <ng-template #wellcome>Hello {{ user.email }}</ng-template>
      <span class="float-right">{{ user.userMessage }}</span>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .pipe(select("user"))
      .subscribe((user: User) => (this.user = user));
  }
}
