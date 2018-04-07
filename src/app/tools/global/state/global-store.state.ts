import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { globalInitialState } from "@tools/global/state/models/global.model";

@Injectable()
export class GlobalStore {
  private state = globalInitialState;

  private userToken$ = new Subject<string>();
  private userIsAnonymous$ = new BehaviorSubject<boolean>(
    this.state.userIsAnonymous
  );
  private userMessage$ = new Subject<string>();

  constructor() {}

  public selectUserToken$(): Observable<string> {
    return this.userToken$.asObservable();
  }
  public selectUserIsAnonymous$(): Observable<boolean> {
    return this.userIsAnonymous$.asObservable();
  }
  public dispatchUserToken(userToken: string) {
    if (userToken) {
      this.state.userToken = userToken;
      this.state.userIsAnonymous = false;
    } else {
      this.state.userToken = "";
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
