import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../reducers';
import { Match } from '../../models';
import { getMatches, getRules, getSpecificMatch } from '../../selectors/referee.selectors';

@Injectable()
export class Referee {

  private readonly _availableMatches$: Observable<{ [key: string]: Match }>;
  private readonly _rules$: Observable<{ [key: string]: { [key: string]: number } }>;

  constructor(private _store: Store<fromRoot.State>) {
    this._availableMatches$ = this._store.select(getMatches);
    this._rules$ = this._store.select(getRules);
  }

  public get availableMatches$(): Observable<{ [key: string]: Match }> {
    return this._availableMatches$;
  }

  public get rules$(): Observable<{ [key: string]: { [key: string]: number } }> {
    return this._rules$;
  }

  public getSpecificMatch(matchId: string): Observable<Match> {
    return this._store.select(getSpecificMatch(matchId));
  }
}
