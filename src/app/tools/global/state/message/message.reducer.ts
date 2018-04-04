import { Action } from "@ngrx/store";
import {
  messageInitialState,
  Message
} from "@tools/global/state/message/models/message.model";
import {
  MessageActions,
  MessageActionTypes
} from "@tools/global/state/message/message.actions";

export function messageReducer(
  state = messageInitialState,
  action: MessageActions
): Message {
  switch (action.type) {
    case MessageActionTypes.ShowMessage:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
