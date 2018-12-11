import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rmb'
})
export class RmbPipe implements PipeTransform {

  constructor() { }

  transform(value: any, identifier: string = '￥', digits: number = 2): string | null {
    if (value) return `${identifier}${value.toFixed(digits)}`;
  }
}
