import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchList'
})
export class FilterSearchListPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
