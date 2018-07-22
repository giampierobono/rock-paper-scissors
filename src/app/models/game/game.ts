import { GameAvailablePlay } from './game-available-play';

export interface Game {
  matchId: string;
  player1Play: GameAvailablePlay;
  player2Play: GameAvailablePlay;
}
