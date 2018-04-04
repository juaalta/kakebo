import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMonthBalance from '../../../month-balance.reducer';

export interface State {

  monthBalance: fromMonthBalance.State;
}

export const reducers: ActionReducerMap<State> = {

  monthBalance: fromMonthBalance.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
