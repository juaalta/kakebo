import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "@environments/environment";
import { userReducer } from "@tools/global/state/user.reducer";
import { User } from "@tools/global/state/models/user.model";
import { Message } from "@tools/global/state/models/message.model";
import { messageReducer } from "@tools/global/state/message.reducer";

export interface State {
  user: User;
  message: Message;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  message: messageReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
