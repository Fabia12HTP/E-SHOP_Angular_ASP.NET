import { Pipe, PipeTransform } from '@angular/core';

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

    return value.filter((item: any) => {
      const descriptionMatch = item.description?.toLowerCase().includes(searchTerm);
      const nameMatch = item.name?.toLowerCase().includes(searchTerm);

      return descriptionMatch || nameMatch;
    });
  }
}
