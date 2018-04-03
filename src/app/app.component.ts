import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "@tools/global/state";
import { ValidateUser } from "@tools/global/state/user.actions";
import { Observable } from "rxjs/Observable";
import { User } from "@tools/global/state/user.model";

@Component({
  selector: "kab-root",
  template: `
  <section class="container">
    <kab-header class="row"></kab-header>
    <hr>
    <main>
      <router-outlet ></router-outlet>
    </main>
    <hr>
    <kab-footer class="row"></kab-footer>
  </section>
  {{ user$ | async | json }}
  `,
  styles: []
})
export class AppComponent implements OnInit {
  user$ : Observable<User>;
  title = "kab";
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(new ValidateUser());
    this.user$ = this.store.pipe(select('user'));
  }
}
