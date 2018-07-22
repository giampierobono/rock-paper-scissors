import { Action } from '../../common/action/action';
import { Game, Match, Rule } from '../../models';

export enum RefereeActionTypes {
  NewRule = '[Referee] New game rule',
  JudgeGame = '[Referee] Judge players game',
  NewMatch = '[Referee] New match'
}

export class NewRule implements Action<Rule> {
  readonly type = RefereeActionTypes.NewRule;

  constructor(public payload: Rule) {
  }
}

export class JudgeGame implements Action<Game> {
  readonly type = RefereeActionTypes.JudgeGame;

  constructor(public payload: Game) {
  }
}

export class NewMatch implements Action<Match> {
  readonly type = RefereeActionTypes.NewMatch;

  constructor(public payload: Match) {
  }
}

export type RefereeActions = NewRule | JudgeGame | NewMatch;
