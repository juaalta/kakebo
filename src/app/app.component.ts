import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "@tools/global/state/user/models/user.model";
import { Store } from "@ngrx/store";
import { GlobalState } from "@tools/global/state";
import { MatSidenav, MatSnackBar } from "@angular/material";
import { Router, RouterEvent, NavigationStart } from "@angular/router";
import { filter } from "rxjs/operators";
import { Message } from "@tools/global/state/message/models/message.model";

@Component({
  selector: "kab-root",
  // template: `
  // <section class="container">
  //   <kab-header class="row"></kab-header>
  //   <hr>
  //   <main>
  //     <router-outlet ></router-outlet>
  //   </main>
  //   <hr>
  //   <kab-footer class="row"></kab-footer>
  // </section>
  // `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public user: User;

  constructor(
    private store: Store<GlobalState>,
    private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getUser();
    this.listenToRouterEvents();
    this.listenToMessages();
  }

  getUser() {
    this.store
      .select(globalState => globalState.user)
      .subscribe((user: User) => (this.user = user));
  }

  listenToRouterEvents() {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationStart))
      .subscribe((event: RouterEvent) => {
        this.closeSidenav();
      });
  }

  listenToMessages() {
    this.store
      .select(globalState => globalState.message)
      .subscribe((message: Message) => {
        if (message.caption) {
          this.snackbar.open(message.caption, 'Close', { duration: 3000 });
        }
      });
  }

  onToggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    }
  }

}
