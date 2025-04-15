import { Component, input, model, output } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
export class PaginatorComponent {

  pageInfo = output<void>();

  length = input.required<number>();
  pageSize = input.required<number>();
  pageIndex = model.required<number>();

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageInfo.emit();
    console.log(this.pageIndex());
  }
}
