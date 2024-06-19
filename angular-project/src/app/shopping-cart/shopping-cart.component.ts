import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  cartService = inject(CartService);
  snackBar = inject(MatSnackBar);

  products = this.cartService.getProducts();

  clearCart() {
    this.products = [];
    this.cartService.products = [];
    this.cartService.count.update(value => 0);
    this.snackBar.open('Cart CLEARD!', '', {
      duration: 2000,
    });
  }
}
