import { Pipe, PipeTransform } from '@angular/core';
import { Shoes } from '../../interfaces/shoes';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: Shoes[], SearchedShoe: string): Shoes[] {
    if (!items) { return []; }

    if (!SearchedShoe) { return items; }

    SearchedShoe = SearchedShoe.toLocaleLowerCase();
    const categoriesArray = SearchedShoe.split(" ");
    const name = SearchedShoe[0];
    const price = SearchedShoe[1];


    return items.filter(items => {
      if (items && items.name) {
        return items.name.toLocaleLowerCase().includes(name) || items.name.toLocaleLowerCase().includes(price);
      }
      return false;
    });
  }

}
