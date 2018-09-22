export interface IPayment {
  objectId: string;
  type: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletPayment extends IPayment {
  btcAddress?: string;
  status: number;
}

const defaultPayment: IPayment = {
  amount: 0,
  createdAt: new Date(),
  objectId: '',
  type: 0,
  updatedAt: new Date()
};

export const defaultWalletPayment: WalletPayment = {
  ...defaultPayment,
  btcAddress: '',
  status: 0
};
