import { Component } from "@angular/core";

@Component({
  selector: "kab-root",
  template: `
  <section class="container">
    <kab-header class="row"></kab-header>
    <hr>
    <section class="row">
      <kab-nav class="column column-20"></kab-nav>
      <section class="column float-left">
        <router-outlet ></router-outlet>
      </section>
    </section>
    <hr>
    <kab-footer class="row"></kab-footer>
  </section>
  `,
  styles: []
})
export class AppComponent {
  title = "kab";
}
