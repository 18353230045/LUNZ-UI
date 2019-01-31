import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateSubscriptionService {
  idle$ = new Subject();

  constructor() { }

}
