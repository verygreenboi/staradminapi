import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Subject, Observable, from } from 'rxjs';
import { map, flatMap, startWith } from 'rxjs/operators';
import { Activity, types, CallActivity, DeductionActivity, RechargeActivity } from './activity';

export interface ParseLoginResponse {
  status: number;
  error?: string;
}

export interface DashboardData {
  calls: number;
  credit: number;
  bank: number;
  account: number;
  activities: Activity[];
}

export const defaultDashboardData: DashboardData = {
  calls: 0,
  credit: 0,
  bank: 0,
  account: 0,
  activities: []
};

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  parseLoginResponseSubject: Subject<ParseLoginResponse> = Subject.create();

  loginStatus = this.parseLoginResponseSubject.asObservable();

  constructor() {
    Parse.initialize('PwYxMbm5w2ztP5EKIx1bqt5HZIYMoHFy3b7xhDKF');
    (Parse as any).serverURL = 'https://star-admin-api.herokuapp.com/v1';
  }

  getCurrentUser(): Parse.User {
    return Parse.User.current();
  }

  getCredits(): Observable<number> {
    const q = new Parse.Query(Parse.User);
    return from(q.get(this.getCurrentUser().id)).pipe(
      map(user => user.get('credit')),
      startWith(0)
    );
  }

  isLoogedIn(): boolean {
    return this.getCurrentUser() != null;
  }

  login(username: string, password: string): Observable<ParseLoginResponse> {
    let status: ParseLoginResponse = {
      status: 0
    };
    const loginObservable: Observable<ParseLoginResponse> = Observable.create(emitter => {
      emitter.next(status);
      Parse.User.logIn(username, password).then((_: Parse.User) => {
        status = {
          status: 1
        };
        emitter.next(status);
        emitter.complete();
      }).catch((err: any) => {
        emitter.error(err);
      });
    });
    return loginObservable;
  }

  setPassword(password: string) {
    const user = Parse.User.current();
    user.setPassword(password);
    user.save().then(() => Parse.User.logOut()).then(() => location.href = '/');
  }

  logout() {
    Parse.User.logOut().then(() => {
      location.href = '/';
    }).catch((err) => {
      console.error(err);
    });
  }

  getDashboardData(): Observable<DashboardData> {
    const data = defaultDashboardData;
    return this.getCallsCount().pipe(
      flatMap(calls => {
        data.calls = calls;
        return this.getBanksCount();
      }),
      flatMap(banks => {
        data.bank = banks;
        return this.getAccountsCount();
      }),
      flatMap(accs => {
        data.account = accs;
        return this.getActivities();
      }),
      flatMap(activities => {
        data.activities = activities;
        return this.getCredits();
      }),
      map(c => {
        data.credit = c;
        return data;
      }),
      startWith(defaultDashboardData)
    );
  }

  getCallsCount(): Observable<number> {
    return Observable.create(emitter => {
      const q = new Parse.Query('Call');
      q.count().then((count) => {
        emitter.next(count);
        emitter.complete();
      }).catch((err) => emitter.error(err));
    });
  }

  getBanksCount(): Observable<number> {
    return Observable.create(emitter => {
      const q = new Parse.Query('Bank');
      q.count().then((count) => {
        emitter.next(count);
        emitter.complete();
      }).catch((err) => emitter.error(err));
    });
  }

  getAccountsCount(): Observable<number> {
    return Observable.create(emitter => {
      const q = new Parse.Query('Account');
      q.count().then((count) => {
        emitter.next(count);
        emitter.complete();
      }).catch((err) => emitter.error(err));
    });
  }

  getActivities(): Observable<Activity[]> {
    const activities: Activity[] = [];

    return Observable.create(emitter => {
      const q = new Parse.Query('Activity');
      q.include('bank');
      q.include('account');
      q.include('call');
      q.descending('createdAt');
      q.limit(5);
      q.find().then((accs) => {
        accs.forEach(element => {
          const t = element.get('type');
          if (t === types.call) {
            activities.push(new CallActivity(element.get('bank'), element.get('call')));
          } else if (t === types.deduction) {
            activities.push(new DeductionActivity(element.get('amount'), element.get('reason')));
          } else if (t === types.recharge) {
            activities.push(new RechargeActivity(element.get('amount')));
          }
        });

        emitter.next(activities);
        emitter.complete();
      }).catch((err) => emitter.error(err));
    });
  }

  getBanks(activatedOnly: boolean = false): Observable<Parse.Object[]> {
    const q = new Parse.Query('Bank');
    if (activatedOnly) {
      q.equalTo('isActive', true);
    }
    return from(q.find());
  }

  getAccounts(): Observable<Parse.Object[]> {
    const q = new Parse.Query('Account');
    q.include('bk');
    return from(q.find());
  }

  getAccount(id: string): Observable<Parse.Object> {
    const q = new Parse.Query('Account');
    q.include('bk');
    return from(q.get(id));
  }

  getBank(id: string): Observable<Parse.Object> {
    const q = new Parse.Query('Bank');
    q.equalTo('objectId', id);
    return this.get(q);
  }


  save(object: Parse.Object): Observable<Parse.Object> {
    return from(object.save());
  }

  get(query: Parse.Query): Observable<Parse.Object> {
    return from(query.first());
  }
}
