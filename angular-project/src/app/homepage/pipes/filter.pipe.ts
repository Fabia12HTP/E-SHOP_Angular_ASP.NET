import { Pipe, PipeTransform } from '@angular/core';
import { FilterParameter } from '../../interfaces/filtered-shoes';
import { Shoes } from '../../interfaces/shoes';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: Shoes[], filterParameters: FilterParameter): any[] {

    const hasActiveValues = Object.values(filterParameters).some((filterValues) => filterValues.size > 0);

    if (!value) {
      return null;
    }

    if (!hasActiveValues) {
      return value;
    }

    return value.filter((item: Shoes) => {
      
      const priceMatch = filterParameters['price'].has(item.price.toString());
      const nameMatch = filterParameters['name'].has(item.name.toLowerCase());
      const brandMatch = filterParameters['brand'].has(item.shoeBrand.toLowerCase());
      const sizeMatch = filterParameters['size'].has(item.shoeSize.toString());
      const colorMatch = filterParameters['color'].has(item.shoeColor.toLowerCase());
      const materialMatch = filterParameters['material'].has(item.shoeMaterial.toLowerCase());
      const ratingMatch = filterParameters['rating'].has(item.rating.toString());

      return priceMatch || nameMatch || brandMatch || sizeMatch || colorMatch || materialMatch || ratingMatch;
    });
  }
}
