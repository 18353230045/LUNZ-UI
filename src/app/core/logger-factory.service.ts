import { Injectable } from '@angular/core';

import { Logger } from '@core/logger.service';
import { Dialogs } from '@core/dialogs.service';

@Injectable()
export class LoggerFactory {

  constructor(private dialogs: Dialogs) { }

  getLogger(source?: string): Logger {
    return new Logger(this.dialogs, source);
  }

}
