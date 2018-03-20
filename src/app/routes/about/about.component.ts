import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-about",
  template: `
    <h1>Kakebo</h1>
    <h2>
      The japanese art of saving money
    </h2>
    <h3>Sample Angular Application</h3>
    <h4>By <a href="https://twitter.com/albertobasalo">Alberto Basalo</a></h4>
  `,
  styles: []
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
