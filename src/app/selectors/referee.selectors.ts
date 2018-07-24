import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/referee/referee.reducer';

export const getRefereeState = createFeatureSelector<State>('referee');
export const getRules = createSelector(getRefereeState, (state: State) => state.rules);
export const getMatches = createSelector(getRefereeState, (state: State) => state.matches);
export const getSpecificMatch = (matchId: string) => createSelector(getRefereeState, (state: State) => state.matches[matchId]);
