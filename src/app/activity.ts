import { Bank } from './bank/bank';
import { Call } from './call';

export const types = {
  call: 0,
  deduction: 1,
  recharge: 2
};

export interface Activity {
  type: number;
}

export class CallActivity implements Activity {
  type: number = types.call;
  public bank: Bank = {
    objectId: this._bank.id,
    createdAt: this._bank.createdAt,
    updatedAt: this._bank.updatedAt,
    title: this._bank.get('title'),
    greetings: this._bank.get('greetings'),
    sim: this._bank.get('sim'),
    redirect: this._bank.get('redirect'),
    credit: this._bank.get('credit'),
    isActive: this._bank.has('isActive') ? this._bank.get('isActive') : false
  };
  public call: Call = {
    objectId: this._call.id,
    createdAt: this._call.createdAt,
    updatedAt: this._call.updatedAt,
    callStartedAt: this._call.get('callStartedAt'),
    callEndedAt: this._call.has('callEndedAt') ? this._call.get('callEndedAt') : null,
    costInCredit: this._call.has('costInCredit') ? this._call.get('costInCredit') : 0
  };
  constructor(readonly _bank: Parse.Object, private _call: Parse.Object) {}
}

export class DeductionActivity implements Activity {
  type: number = types.deduction;
  constructor(public amount: number = 0, public reason: string = '') {}
}

export class RechargeActivity implements Activity {
  type: number = types.recharge;
  constructor(public amount: number = 0) {}
}
