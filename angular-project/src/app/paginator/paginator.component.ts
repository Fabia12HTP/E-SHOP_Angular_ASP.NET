import { Component, Input, input, output } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounce } from 'rxjs';

export interface shoesRange {
  pageIndex: number,
  lenght: number,
  pageSize: number;
}


@Component({
  selector: 'paginator-configurable-example',
  templateUrl: 'paginator.component.html',
  styleUrl: 'paginator.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
})
export class PaginatorComponent  {

  pageInfo = output<shoesRange>();

  @Input() length: number; // decorate the property with @Input()

  //length = 12;
  pageSize = 4;
  pageIndex = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.pageInfo.emit({ pageIndex: e.pageIndex, lenght: e.length, pageSize: e.pageSize });
    console.log(this.pageIndex);
  }
}
