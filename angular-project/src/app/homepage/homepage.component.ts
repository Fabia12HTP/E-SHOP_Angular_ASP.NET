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
import { AuthenticationService } from '../api-authorization/authentication.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, SerachPipe, FilterPipe, FormsModule, MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomepageComponent {
  activatedRoute = inject(ActivatedRoute);
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

  navigateToRegPage() {
    if (!this.authService.authenticated()) {
      this.router.navigate(['/login']);
    }

    else {
      this.snackBar.open('Shoe added to cart!', 'OK!', {
        duration: 3000,
      });
    }
  }

  getSpecificFilter(filterName: string) {
    const filteredValues = new Set<string>();

    for (const filter of this.shoes()) {
      switch (filterName) {
        case 'CENA': filteredValues.add(filter.price.toString())
          break;
        case 'ZNAČKA': filteredValues.add(filter.shoeBrand.toString());
          break;
        case 'MENO': filteredValues.add(filter.name);
          break;
        case 'VEĽKOSŤ': filteredValues.add(filter.shoeSize.toString());
          break;
        case 'FARBA': filteredValues.add(filter.shoeColor);
          break;
        case 'MATERIÁL': filteredValues.add(filter.shoeMaterial);
          break;
        case 'HODNOTENIE': filteredValues.add(filter.rating.toString());
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
        case 'CENA': newFilterParameters.price.add(filterValue);
          break;
        case 'MENO': newFilterParameters.name.add(filterValue);
          break;
        case 'ZNAČKA': newFilterParameters.brand.add(filterValue);
          break;
        case 'VEĽKOSŤ': newFilterParameters.size.add(filterValue);
          break;
        case 'FARBA': newFilterParameters.color.add(filterValue);
          break;
        case 'MATERIÁL': newFilterParameters.material.add(filterValue);
          break;
        case 'HODNOTENIE': newFilterParameters.rating.add(filterValue);
          break;
      }
    } else {
      switch (filterName) {
        case 'CENA': newFilterParameters.price.delete(filterValue);
          break;
        case 'MENO': newFilterParameters.name.delete(filterValue);
          break;
        case 'ZNAČKA': newFilterParameters.brand.delete(filterValue);
          break;
        case 'VEĽKOSŤ': newFilterParameters.size.delete(filterValue);
          break;
        case 'FARBA': newFilterParameters.color.delete(filterValue);
          break;
        case 'MATERIÁL': newFilterParameters.material.delete(filterValue);
          break;
        case 'HODNOTENIE': newFilterParameters.rating.delete(filterValue);
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
}
