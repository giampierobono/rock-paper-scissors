import { PlayerType } from './player-type';

export interface Player {
  name: string;
  playerType: PlayerType;
  score: number;
}
