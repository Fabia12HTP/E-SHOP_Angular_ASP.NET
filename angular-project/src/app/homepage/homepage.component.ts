import { Component, effect, inject, signal } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FilterParameter } from '../interfaces/filtered-shoes';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerachPipe } from '../homepage/pipes/serach-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { Subject, takeUntil } from 'rxjs';
import { Shoes } from '../interfaces/shoes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { AuthenticationService } from '../api-authorization/authentication.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, SerachPipe, FilterPipe, FormsModule, MatIconModule, MatSliderModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomepageComponent {
  activatedRoute = inject(ActivatedRoute);
  cartServise = inject(CartService);
  shoeService = inject(ShoesService);
  authService = inject(AuthenticationService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  constructor() {
    effect(() => {
      console.log("Filter parameters changed:", this.filterParameters());
    });
  }

  private destroy$ = new Subject<void>();

  searchText = '';

  filters: Set<string> = new Set(["CENA", "ZNAČKA", "MENO", "VEĽKOSŤ", "FARBA", "MATERIÁL", "HODNOTENIE"]);
  filterIds: Set<string> = new Set([]);

  public filterParameters = signal<FilterParameter>({
    price: new Set<number>(),
    name: new Set<string>(),
    brand: new Set<string>(),
    size: new Set<number>(),
    color: new Set<string>(),
    material: new Set<string>(),
    rating: new Set<number>()
  });

  value: number;

  priceMin: number = 0;
  priceMax: number = 500;

  shoePrices: number[] = [];

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
    let currentPage = this.activatedRoute.snapshot.queryParams['page'];
    currentPage = page;

    this.router.navigate(['home/detail'], { queryParams: { page: currentPage } });
  }

  addToCart(event: MouseEvent, product: Shoes) {

    event.stopPropagation();

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

  getSpecificFilter(filterName: string) {
    const filteredValues = new Set<string>();

    for (const filter of this.shoes()) {
      switch (filterName) {
        case 'CENA':
          filteredValues.add(filter.price.toString())
          break;
        case 'ZNAČKA':
          filteredValues.add(filter.shoeBrand.toString());
          break;
        case 'MENO':
          filteredValues.add(filter.name);
          break;
        case 'VEĽKOSŤ':
          filteredValues.add(filter.shoeSize.toString());
          break;
        case 'FARBA':
          filteredValues.add(filter.shoeColor);
          break;
        case 'MATERIÁL':
          filteredValues.add(filter.shoeMaterial);
          break;
        case 'HODNOTENIE':
          filteredValues.add(filter.rating.toString());
          break;
      }
    }

    return Array.from(filteredValues)
  }

  getValue(eventHandler: any) {
    const filterName = eventHandler.target.attributes.id.nodeValue;
    let filterValue = eventHandler.target.value;

    // Konvertujte hodnotu na číslo, ak je to potrebné
    if (filterName === 'CENA' || filterName === 'VEĽKOSŤ' || filterName === 'HODNOTENIE') {
      filterValue = +filterValue;
    }

    const newFilterParameters = { ...this.filterParameters() };

    if (eventHandler.target.checked) {
      switch (filterName) {
        case 'MENO':
          newFilterParameters.name.add(filterValue);
          break;
        case 'ZNAČKA':
          newFilterParameters.brand.add(filterValue);
          break;
        case 'VEĽKOSŤ':
          newFilterParameters.size.add(filterValue);
          break;
        case 'FARBA':
          newFilterParameters.color.add(filterValue);
          break;
        case 'MATERIÁL':
          newFilterParameters.material.add(filterValue);
          break;
        case 'HODNOTENIE':
          newFilterParameters.rating.add(filterValue);
          break;
      }
    }

    else {
      switch (filterName) {       
        case 'MENO':
          newFilterParameters.name.delete(filterValue);
          break;
        case 'ZNAČKA':
          newFilterParameters.brand.delete(filterValue);
          break;
        case 'VEĽKOSŤ':
          newFilterParameters.size.delete(filterValue);
          break;
        case 'FARBA':
          newFilterParameters.color.delete(filterValue);
          break;
        case 'MATERIÁL':
          newFilterParameters.material.delete(filterValue);
          break;
        case 'HODNOTENIE':
          newFilterParameters.rating.delete(filterValue);
          break;
      }
    }

    this.filterParameters.set(newFilterParameters);
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('star'),
      ...(halfStar ? ['star_half'] : []),
      ...Array(emptyStars).fill('star_border')
    ];
  }

  getFilterCount(filterName: string, filterValue: string): number {
    return this.shoes().filter(shoe => {
      switch (filterName) {
        case 'CENA':
          return shoe.price.toString() === filterValue;
        case 'ZNAČKA':
          return shoe.shoeBrand === filterValue;
        case 'MENO':
          return shoe.name === filterValue;
        case 'VEĽKOSŤ':
          return shoe.shoeSize.toString() === filterValue;
        case 'FARBA':
          return shoe.shoeColor === filterValue;
        case 'MATERIÁL':
          return shoe.shoeMaterial === filterValue;
        case 'HODNOTENIE':
          return shoe.rating.toString() === filterValue;
        default:
          return false;
      }
    }).length;
  }

  updatePriceFilter() {
    const newFilterParameters = { ...this.filterParameters() };

    newFilterParameters.price = new Set<number>([this.value]);
    this.filterParameters.set(newFilterParameters);

    for (const shoe of this.shoes()) {
      this.shoePrices.push(shoe.price);

      this.priceMax = Math.max(...this.shoePrices);
      this.priceMin = Math.min(...this.shoePrices);
    }

    console.log(this.priceMax);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}€`;
  }
}
