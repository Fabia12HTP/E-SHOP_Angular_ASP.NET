import { Injectable } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { Shoes } from '../interfaces/shoes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  snackBar = inject(MatSnackBar);

  public products: Shoes[] = [];

  count = signal(0);
  amount: number = 0;

  addToCart(product: Shoes) {
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }
}
