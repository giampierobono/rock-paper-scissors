import { Action } from '@ngrx/store';

export interface BaseAction extends Action {
  errors?: any;
}
