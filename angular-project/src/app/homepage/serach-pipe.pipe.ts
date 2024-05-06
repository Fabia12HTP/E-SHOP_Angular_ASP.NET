import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serachPipe',
  standalone: true
})
export class SerachPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null || console.error(value);
    if (!args) return value || console.error(args);

    args = args.toLowerCase();

    return value.filter((item: any) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }
}

