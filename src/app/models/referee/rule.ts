import { GameAvailablePlay } from '../game';

export interface Rule {
  winner: GameAvailablePlay | string;
  loser: GameAvailablePlay | string;
}
