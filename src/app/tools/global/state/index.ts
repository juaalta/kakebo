import { environment } from "@environments/environment";
import { User } from "@tools/global/state/user/models/user.model";
import { userReducer } from "@tools/global/state/user/user.reducer";
import { Message } from "@tools/global/state/message/models/message.model";
import { messageReducer } from "@tools/global/state/message/message.reducer";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";

export interface GlobalState {
  user: User;
  message: Message;
}

export const reducers: ActionReducerMap<GlobalState> = {
  user: userReducer,
  message: messageReducer
};

export const metaReducers: MetaReducer<GlobalState>[] = !environment.production
  ? []
  : [];
