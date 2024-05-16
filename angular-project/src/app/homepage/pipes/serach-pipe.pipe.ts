import { Pipe, PipeTransform } from '@angular/core';
import { Shoes } from '../../interfaces/shoes';

@Pipe({
  name: 'serachPipe',
  standalone: true
})
export class SerachPipe implements PipeTransform {

  transform(value: any[], args?: string): any[] {
    if (!value) {
      return null;
    }
    if (!args) {
      return value;
    }

    const searchTerm = args.toLowerCase();

    return value.filter((item: Shoes) => {
      const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
      const nameMatch = item.name.toLowerCase().includes(searchTerm);

      console.log(searchTerm)
      
      return descriptionMatch || nameMatch;
    });
  }
}
