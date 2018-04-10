import { Component, OnInit } from "@angular/core";
import { PwaService } from "@tools/global/pwa.service";

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
export class AppComponent implements OnInit {

  public title = "kab";

  constructor(private pwaService: PwaService) { }

  ngOnInit() {
    this.pwaService.checkForUpdates();
  }

}
