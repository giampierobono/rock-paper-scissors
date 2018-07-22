import { Player } from '../player';
import { GameResult } from '../game';

export interface Match {
  player1: Player;
  player2: Player;
  matchId: string;
  gameResults: GameResult[];
}
