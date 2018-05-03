import { Component, OnInit } from '@angular/core';
import { GlobalStoreService } from './core/store/global-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'kab-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  public userMessage$: Observable<string>;
  public userIsAnonymous$: Observable<boolean>;
  constructor(private globalStore: GlobalStoreService) {}

  ngOnInit(): void {
    this.userMessage$ = this.globalStore.selectUserMessage$();
    this.userIsAnonymous$ = this.globalStore.selectUserIsAnonymous$();
  }
}
