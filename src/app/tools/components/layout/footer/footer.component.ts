import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-footer",
  // template: `
  // <footer>
  //   <blockquote>
  //     <div class="clearfix">
  //       <div class="float-left">
  //         <em>The japanese art of saving money.</em> 
  //       </div> 
  //       <div class="float-right"> - Coded by <a href="https://twitter.com/albertobasalo">Alberto Basalo</a></div>
  //     </div>
  //   </blockquote>
  // </footer>
  // `,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
