import { Component, OnInit, Input } from '@angular/core';
import { User } from '@tools/global/state/user/models/user.model';

@Component({
  selector: "kab-sidenav",
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
