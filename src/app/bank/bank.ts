import { Objects } from '../object';

export interface Bank extends Objects {
  title: string;
  sim: string;
  greetings: string;
  credit: number;
  redirect: string;
  isActive: boolean;
}

export const defaultBank: Bank = {
  objectId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  title: '',
  sim: '',
  greetings: '',
  credit: 0,
  redirect: '',
  isActive: false
};
