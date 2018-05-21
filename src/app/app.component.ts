import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalStoreService } from './core/store/global-store.service';

@Component({
  selector: 'kab-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  public userMessage$: Observable<string>;
  public userMessage: string;
  public userIsAnonymous$: Observable<boolean>;
  constructor(private globalStore: GlobalStoreService) {}

  ngOnInit(): void {
    this.globalStore.selectUserMessage$().subscribe(res => this.userMessage = res);
    
    this.userMessage$ = this.globalStore.selectUserMessage$();
    this.userIsAnonymous$ = this.globalStore.selectUserIsAnonymous$();
  }
}
