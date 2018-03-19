import { Component } from "@angular/core";

@Component({
  selector: "kab-root",
  template: `
  <section class="container">
    <kab-header class="row"></kab-header>
    <hr>
    <router-outlet ></router-outlet>
    <hr>
    <kab-footer class="row"></kab-footer>
  </section>
  `,
  styles: []
})
export class AppComponent {
  title = "kab";
}
