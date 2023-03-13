import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearchList'
})
export class FilterSearchListPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => item.name.indexOf(filter) !== -1);
}


}
