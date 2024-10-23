import { Component, Input, inject, signal } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { CommonModule } from '@angular/common';
import { Shoes } from '../interfaces/shoes';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../api-authorization/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/cart.service';

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
  cartServise = inject(CartService);
  authService = inject(AuthenticationService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

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

  addToCart(product: Shoes) {
    if (!this.authService.authenticated()) {
      this.router.navigate(['/login']);
    }

    else {
      this.cartServise.addToCart(product);
      this.snackBar.open('SHOE added to cart!', '', {
        duration: 3000,
      });
    }
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
  
  colorCombination(shoeColour: any): any {
    if (!shoeColour.includes("-")) {
      return [shoeColour]
    }

    else if (shoeColour.includes("-")) {
      return shoeColour.split("-");
    }

    else {
      return null
    }
  }

  selectColor(color: any): void {
    console.log('Farebná Kombinácia:', color);
  }
}
