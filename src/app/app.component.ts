import { Component, OnInit } from "@angular/core";

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
  `,
  styles: []
})
export class AppComponent {

  public title = "kab";

}
