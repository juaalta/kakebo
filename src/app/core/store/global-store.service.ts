import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Global,
  globalInitialState
} from './models/global.model';

@Injectable()
export class GlobalStoreService {
  private state: Global = globalInitialState;

  private userToken$ = new BehaviorSubject<string>(
    this.state.userToken
  );
  private userIsAnonymous$ = new BehaviorSubject<boolean>(
    this.state.userIsAnonymous
  );
  private userMessage$ = new BehaviorSubject<string>(
    this.state.userMessage
  );

  constructor() {
    const userToken = localStorage.getItem('userToken');
    this.dispatchUserToken(userToken);
  }

  public selectUserToken$(): Observable<string> {
    return this.userToken$.asObservable();
  }
  public selectUserIsAnonymous$(): Observable<boolean> {
    return this.userIsAnonymous$.asObservable();
  }
  public dispatchUserToken(userToken: string) {
    if (userToken) {
      this.state.userToken = userToken;
      localStorage.setItem('userToken', userToken);
      this.state.userIsAnonymous = false;
    } else {
      this.state.userToken = null;
      localStorage.removeItem('userToken');
      this.state.userIsAnonymous = true;
    }
    this.userToken$.next(this.state.userToken);
    this.userIsAnonymous$.next(this.state.userIsAnonymous);
  }
  public selectUserMessage$(): Observable<string> {
    return this.userMessage$.asObservable();
  }
  public dispatchUserMessage(userMessage: string) {
    this.state.userMessage = userMessage;
    this.userMessage$.next(this.state.userMessage);
  }
}
