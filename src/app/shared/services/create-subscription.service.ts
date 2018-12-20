import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateSubscriptionService {
  $idle = new BehaviorSubject('');
  currentData = this.$idle.asObservable();

  constructor() { }

  publishSubscribeIdle(val?: string) {
    this.$idle.next(val);
  }
}
