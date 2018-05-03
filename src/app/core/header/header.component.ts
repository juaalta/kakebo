import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kab-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  @Input() public userMessage: string;
  @Input() public userIsAnonymous = true;
  constructor() {}

  ngOnInit() {}
}
