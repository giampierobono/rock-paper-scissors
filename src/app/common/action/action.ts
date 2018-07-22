import { BaseAction } from './base-action';

export interface Action<T> extends BaseAction {
  payload: T;
}
