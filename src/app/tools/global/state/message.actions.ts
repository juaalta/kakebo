import { Action } from "@ngrx/store";
import { Message } from "@tools/global/state/models/message.model";

export enum MessageActionTypes {
  ShowMessage = "[Message] ShowMessage"
}

export class ShowMessage implements Action {
  readonly type = MessageActionTypes.ShowMessage;
  constructor(public payload: Message) {}
}

export type MessageActions = ShowMessage;
