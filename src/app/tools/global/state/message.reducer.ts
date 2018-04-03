import { Action } from "@ngrx/store";
import {
  Message,
  messageInitialState
} from "@tools/global/state/models/message.model";
import {
  MessageActions,
  MessageActionTypes
} from "@tools/global/state/message.actions";

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
