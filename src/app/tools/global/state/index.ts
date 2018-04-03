import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@environments/environment';
import { User } from '@tools/global/state/user.model';
import { userReducer } from '@tools/global/state/user.reducer';

export interface State {
  user: User;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
