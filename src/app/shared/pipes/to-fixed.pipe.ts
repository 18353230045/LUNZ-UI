import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})

export class ToFixedPipe implements PipeTransform {

  transform(value: any, args: number = 2): any {
    if (typeof value === 'number') {
      return (value / 1024).toFixed(args);
    }
  }
}
