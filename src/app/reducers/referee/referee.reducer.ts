import { RefereeActions, RefereeActionTypes } from '../../actions/referee/referee.actions';
import { Match } from '../../models';
import { judge, learn } from '../../common/utils/referee/referee.utils';

export interface State {
  rules: { [key: string]: { [key: string]: number } };
  matches: { [key: string]: Match};
}

export const initialState: State = {
  rules: {} as { [key: string]: { [key: string]: number } },
  matches: {} as { [key: string]: Match}
};

export function reducer(state = initialState, action: RefereeActions): State {
  switch (action.type) {
    case RefereeActionTypes.NewRule: {
      return {
        ...state,
        rules: {
          ...learn(state.rules)(action.payload.winner, action.payload.loser)
        }
      };
    }

    case RefereeActionTypes.JudgeGame: {
      const clonedState = { ...state };
      if (clonedState.matches[action.payload.matchId]) {
        const currentMatch = clonedState.matches[action.payload.matchId];
        currentMatch.gameResults.push(judge(state.rules)(action.payload.player1Play, action.payload.player2Play));
      }
      return clonedState;
    }

    case RefereeActionTypes.NewMatch: {
      const clonedState = { ...state };
      clonedState.matches[action.payload.matchId] = action.payload;
      return clonedState;
    }

    default:
      return state;
  }
}
