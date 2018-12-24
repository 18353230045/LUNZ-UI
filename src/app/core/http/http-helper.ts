import { HttpParams } from '@angular/common/http';

export function toURLSearchParams(params: any): HttpParams {
  let result = new HttpParams();

  const add = function (key: string, valueOrFunc: any) {
    let value: any;

    if (typeof valueOrFunc === 'function') {
      value = value();
    } else {
      value = valueOrFunc;
    }

    result = result.append(key, value);
  };

  if (params && params != null) {
    for (const prop in params) {
      if (prop) {
        buildParams(prop, params[prop], add);
      }
    }
  }
  return result;
}

function buildParams(prefix: string, params: any, add: any) {
  if (params === '') {
    add(prefix, '');
  } else if (Array.isArray(params)) {
    params.forEach((item, index) => {
      buildParams(prefix + '[' + index + ']', item, add);
      // buildParams(prefix + '[' + (typeof item === 'object' && item != null ? index : '') + ']', item, add);
    });
  } else if (typeof params === 'object') {
    for (const prop in params) {
      if (prop) {
        // buildParams(prefix + '[' + prop + ']', params[prop], add);
        buildParams(prefix + '.' + prop, params[prop], add);
      }
    }
  } else if (params) {
    add(prefix, params);
  }
}

export function camelCaseObject(obj: any): any {
  let dest: any = obj;

  if (isArray(obj)) {
    dest = obj ? new Array<any>() : undefined;
    for (const item of obj) {
      const clonedObj = camelCaseObject(item);
      dest.push(clonedObj);
    }
  } else if (isObject(obj)) {
    dest = obj ? {} : undefined;
    for (const key in obj) {
      if (key && obj[key] !== undefined) {
        const obj1 = obj[key];
        const clonedObj = camelCaseObject(obj1);
        dest[camelCaseKey(key)] = clonedObj;
      }
    }
  }

  return dest;
}

function camelCaseKey(s: string): string {
  return s.substring(0, 1).toLowerCase() + s.substring(1);
}

function isArray(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject(obj: any): boolean {
  return typeof obj === 'object';
}
