import { Objects } from '../object';
import { Bank } from '../bank/bank';

export interface Account extends Objects {
  accountName: string;
  accountNumber: string;
  accountCurrency: string;
  accountBalance: number;
  accountPin: string;
  accountVerifyCode: string;
  bank: Bank;
}
