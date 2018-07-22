import { initialState, reducer } from './referee.reducer';
import { GameAvailablePlay, GameResult, Match, Player, PlayerType, Rule } from '../../models';
import { JudgeGame, NewMatch, NewRule } from '../../actions/referee/referee.actions';

const testPlayer: Player = {
  name: 'TestPlayer1',
  playerType: PlayerType.HUMAN,
  score: 0
};
const match: Match = { matchId: 'testMatch', player1: testPlayer, player2: testPlayer, gameResults: [] };

describe('Referee Reducer', () => {

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('new rule action', () => {
    it('should add a new rule to the state', () => {
      const rule: Rule = { winner: GameAvailablePlay.PAPER, loser: GameAvailablePlay.ROCK };
      const newRuleAction = new NewRule(rule);
      const result = reducer(initialState, newRuleAction);
      expect(result.rules[GameAvailablePlay.PAPER][GameAvailablePlay.ROCK]).toBe(1);
    });

    it('should be easy to teach to referee a new rule with new available plays', () => {
      const rule: Rule = { winner: 'lizard', loser: 'Spock' };
      const newRuleAction = new NewRule(rule);
      const result = reducer(initialState, newRuleAction);
      expect(result.rules['lizard']['Spock']).toBe(1);
    });
  });

  describe('new match rule', () => {
    it('should add a new match to the referee state', () => {
      const result = reducer(initialState, new NewMatch(match));
      expect(result.matches['testMatch']).toEqual(match);
    });
  });

  describe('judge action', () => {
    let refereeState = initialState;
    beforeAll(() => {
      const rules: Array<Rule> = [
        { winner: GameAvailablePlay.PAPER, loser: GameAvailablePlay.ROCK },
        { winner: GameAvailablePlay.ROCK, loser: GameAvailablePlay.SCISSORS },
        { winner: GameAvailablePlay.SCISSORS, loser: GameAvailablePlay.ROCK }
      ];

      rules.forEach((rule: Rule) => {
        refereeState = reducer(refereeState, new NewRule(rule));
      });

      refereeState = reducer(refereeState, new NewMatch(match));
    });

    it('should be a tie if two players chose the same play', () => {
      const judgeAction = new JudgeGame({
        player1Play: GameAvailablePlay.PAPER,
        player2Play: GameAvailablePlay.PAPER,
        matchId: 'testMatch'
      });
      const result = reducer(refereeState, judgeAction);
      const gameResults = result.matches['testMatch'].gameResults;
      expect(gameResults[gameResults.length - 1]).toEqual(GameResult.TIE);
    });

    it('should win player1 if paper - rock', () => {
      const judgeAction = new JudgeGame({
        player1Play: GameAvailablePlay.PAPER,
        player2Play: GameAvailablePlay.ROCK,
        matchId: 'testMatch'
      });
      const result = reducer(refereeState, judgeAction);
      const gameResults = result.matches['testMatch'].gameResults;
      expect(gameResults[gameResults.length - 1]).toEqual(GameResult.PLAYER1_WIN);
    });

    it('should win player2 if rock - paper', () => {
      const judgeAction = new JudgeGame({
        player1Play: GameAvailablePlay.ROCK,
        player2Play: GameAvailablePlay.PAPER,
        matchId: 'testMatch'
      });
      const result = reducer(refereeState, judgeAction);
      const gameResults = result.matches['testMatch'].gameResults;
      expect(gameResults[gameResults.length - 1]).toEqual(GameResult.PLAYER2_WIN);
    });
  });
});
