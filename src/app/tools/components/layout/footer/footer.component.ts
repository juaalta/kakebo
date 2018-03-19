import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-footer",
  template: `
  <footer>
    <blockquote>
      <p><em>The japanese art of saving money</em> Coded by <a href="https://twitter.com/albertobasalo">Alberto Basalo</a></p>
    </blockquote>
  </footer>
  `,
  styles: []
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
