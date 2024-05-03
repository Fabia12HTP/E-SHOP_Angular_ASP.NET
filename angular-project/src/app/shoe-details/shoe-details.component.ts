import { Component, Input, inject, signal } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { CommonModule } from '@angular/common';
import { Shoes } from '../interfaces/shoes';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shoe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoe-details.component.html',
  styleUrl: './shoe-details.component.css'
})
export class ShoeDetailsComponent {
  shoeService = inject(ShoesService);
  activatedRoute = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();

  @Input() pageNum: number;

  shoesD = signal<Shoes>(undefined);

  ngOnInit() {

    if (this.pageNum) {
      this.loadShoeDetails(this.pageNum);
      console.error(`Parameter "page" is ${this.pageNum}`);
    }

    else {
      console.error(`Parameter "page" is ${this.pageNum}`);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadShoeDetails(page: number): void {
    this.shoeService.getShoeDetailsList(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.shoesD.set(result));
  }
}
