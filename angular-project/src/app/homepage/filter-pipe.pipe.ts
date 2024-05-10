import { Pipe, PipeTransform } from '@angular/core';
import { Shoes } from '../interfaces/shoes';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Shoes, : string): unknown {
    return null;
  }

}
