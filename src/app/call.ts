import { Objects } from './object';

export interface Call extends Objects {
  callStartedAt: Date;
  callEndedAt?: Date;
  costInCredit?: number;
}
