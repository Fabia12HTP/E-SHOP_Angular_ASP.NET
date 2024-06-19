import { Component, Input, inject, signal } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { CommonModule } from '@angular/common';
import { Shoes } from '../interfaces/shoes';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shoe-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './shoe-details.component.html',
  styleUrl: './shoe-details.component.css'
})
export class ShoeDetailsComponent {
  shoeService = inject(ShoesService);
  activatedRoute = inject(ActivatedRoute);

  private destroy$ = new Subject<void>(); 

  shoesD = signal<Shoes>(undefined);

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const page = params['page'];

      if (page) {
        this.loadShoeDetails(page);
      }

      else {
        console.error(`Parameter 'page' is ${page}`);
      }
    });
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

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill('star'),
      ...Array(halfStars).fill('star_half'),
      ...Array(emptyStars).fill('star_outline')
    ];
  }

  selectColor(color: string): void {
    console.log('Farebná Kombinácia:', color);
  }
}
