import { Pipe, PipeTransform, WritableSignal } from '@angular/core';
import { FilterParameter } from '../../interfaces/filtered-shoes';
import { Shoes } from '../../interfaces/shoes';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: Shoes[], filterParameters: WritableSignal<FilterParameter>): any[] {

   /* const hasActiveValues = Object.values(filterParameters.value).some((filterValues) => filterValues.size > 0);*/

    if (!value) {
      return null;
    }

    if (Object.values(filterParameters()).every(filterValues => filterValues.size === 0)
)   {
      return value;
    }

    return value.filter((item: Shoes) => {
      console.log(filterParameters());
      const priceMatch = filterParameters().price.has(item.price);
      const nameMatch = filterParameters().name.has(item.name.toLowerCase());
      const brandMatch = filterParameters().brand.has(item.shoeBrand.toLowerCase());
      const sizeMatch = filterParameters().size.has(item.shoeSize);
      const colorMatch = filterParameters().color.has(item.shoeColor.toLowerCase());
      const materialMatch = filterParameters().material.has(item.shoeMaterial.toLowerCase());
      const ratingMatch = filterParameters().rating.has(item.rating);

      return priceMatch || nameMatch || brandMatch || sizeMatch || colorMatch || materialMatch || ratingMatch;
    });
  }
}
