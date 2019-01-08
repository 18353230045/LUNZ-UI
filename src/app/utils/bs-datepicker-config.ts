import { BsDatepickerConfig } from 'ngx-bootstrap';

export function createBsDatepickerConfigProvider() {
  return {
    provide: BsDatepickerConfig,
    useFactory: createDatepickerConfig
  };
}

export function createDatepickerConfig() {
  const config: BsDatepickerConfig = new BsDatepickerConfig();

  config.containerClass = 'theme-blue';
  config.dateInputFormat = 'YYYY-MM-DD';

  return config;
}
