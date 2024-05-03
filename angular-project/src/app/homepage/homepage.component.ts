import { Component, inject, signal } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { MatButtonModule } from '@angular/material/button';
import { ShoeDetailsComponent } from '../shoe-details/shoe-details.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shoes } from '../interfaces/shoes';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, ShoeDetailsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  shoeService = inject(ShoesService);
  router = inject(Router);

  private destroy$ = new Subject<void>();

  shoes = signal<Shoes[]>([]);

  ngOnInit(): void {
    this.shoeService.getShoeList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.shoes.set(result));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToShoeDetails(page: number) {
    this.router.navigate(['home/detail'], { queryParams: { page } });
  }
}
