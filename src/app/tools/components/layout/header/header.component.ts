import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { GlobalState } from "@tools/global/state";
import { Message } from "@tools/global/state/message/models/message.model";
import { User } from "@tools/global/state/user/models/user.model";

@Component({
  selector: "kab-header",
  // template: `
  //   <header class="container">
  //     <a class="button button-clear" routerLink="">Kakebo</a>
  //     <a class="button button-clear" routerLink="about">About</a>
  //     <a *ngIf="user?.userIsAnonymous ;else welcome" class="button button-clear" routerLink="credentials/login">Login</a>
  //     <ng-template #welcome>Hello {{ user.email }}</ng-template>
  //     <span [ngClass]="['float-right',getMessageClass(message)]">{{ message.caption }}</span>
  //   </header>
  // `,
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  @Input() user: User;
  @Output() toggleSidenav = new EventEmitter<void>();

  public message: Message;

  constructor(private store: Store<GlobalState>) { }

  ngOnInit(): void {
    this.store
      .select(globalState => globalState.message)
      .subscribe((message: Message) => (this.message = message));
  }

  public getMessageClass(message: Message): string {
    switch (message.type) {
      case "info":
        return "accent";
      case "warn":
        return "warn";
      case "error":
        return "error";
      default:
        break;
    }
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

}
