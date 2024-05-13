import { Component, inject } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterParameter } from '../interfaces/filtered-shoes';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerachPipe } from '../homepage/pipes/serach-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, SerachPipe, FilterPipe, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomepageComponent {
  activatedRoute = inject(ActivatedRoute);
  shoeService = inject(ShoesService);
  router = inject(Router);

  searchText = '';

  filters: Set<string> = new Set(["CENA", "ZNAČKA", "MENO", "VEĽKOSŤ", "FARBA", "MATERIÁL", "HODNOTENIE"]);
  filterIds: Set<string> = new Set([]);


  filterParameters: FilterParameter = {
    price: new Set<string>,
    name: new Set<string>,
    brand: new Set<string>,
    size: new Set<string>,
    color: new Set<string>,
    material: new Set<string>,
    rating: new Set<string>,
  };

  shoes = toSignal(this.shoeService.getShoeList());
  

  goToShoeDetails(page: number) {
    let currentPage = this.activatedRoute.snapshot.queryParams['page'];
    currentPage = page;

    this.router.navigate(['home/detail'], { queryParams: { page: currentPage } });
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

    const filterValue = eventHandler.target.value.toString()

    if (eventHandler.target.checked) {
      switch (eventHandler.target.attributes.id.nodeValue) {
        case 'CENA': this.filterParameters['price'].add(filterValue)
          break;
        case 'MENO': this.filterParameters['name'].add(filterValue)
          break
        case 'ZNAČKA': this.filterParameters['brand'].add(filterValue)
          break;
        case 'VEĽKOSŤ': this.filterParameters['size'].add(filterValue)
          break;
        case 'FARBA': this.filterParameters['color'].add(filterValue)
          break;
        case 'MATERIÁL': this.filterParameters['material'].add(filterValue)
          break;
        case 'HODNOTENIE': this.filterParameters['rating'].add(filterValue)
          break;
      }
    }

    else {
      switch (eventHandler.target.attributes.id.nodeValue) {
        case 'CENA': this.filterParameters['price'].delete(filterValue)
          break;
        case 'MENO': this.filterParameters['name'].delete(filterValue)
          break
        case 'ZNAČKA': this.filterParameters['brand'].delete(filterValue)
          break;
        case 'VEĽKOSŤ': this.filterParameters['size'].delete(filterValue)
          break;
        case 'FARBA': this.filterParameters['color'].delete(filterValue)
          break;
        case 'MATERIÁL': this.filterParameters['material'].delete(filterValue)
          break;
        case 'HODNOTENIE': this.filterParameters['rating'].delete(filterValue)
          break;
      }
    }
    
    console.log(this.filterParameters);
    return this.filterParameters; 
  }
}
