import { GameAvailablePlay, GameResult } from '../../../models';


export const learn = (rules: { [key: string]: { [key: string]: number } }) =>
  (winner: GameAvailablePlay | string, loser: GameAvailablePlay | string): { [key: string]: { [key: string]: number } } => {
    const clonedRules = { ...rules };
    if (!clonedRules[winner]) {
      clonedRules[winner] = {};
    }
    clonedRules[winner][loser] = 1;
    return clonedRules;
  };

export const judge = (rules: { [key: string]: { [key: string]: number } }) =>
  (play1: GameAvailablePlay | string, play2: GameAvailablePlay | string): GameResult => {
    if (play1 === play2) {
      return GameResult.TIE;
    }
    return rules[play1][play2] === 1 ? GameResult.PLAYER1_WIN : GameResult.PLAYER2_WIN;
  };
