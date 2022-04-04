import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): number {
    const minutesApart = (+value - +new Date()) / 1000 / 60;
    return minutesApart;
  }

}
