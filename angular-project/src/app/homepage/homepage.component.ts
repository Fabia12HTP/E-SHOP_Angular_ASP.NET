import { Component, inject } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  filterInnerValue: Set<string> = new Set([]);

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
        case 'CENA': filteredValues.add(filter.price.toString());
          break;
        //case 'ZNAČKA': filteredValues.add(filter.shoeBrand.toString());
        //  break;
        case 'MENO': filteredValues.add(filter.name);
          break;
        //case 'VEĽKOSŤ': filteredValues.add(filter.shoeSize.toString());
        //  break;
        //case 'FARBA': filteredValues.add(filter.shoeColor);
        //  break;
        //case 'MATERIÁL': filteredValues.add(filter.shoeMaterial);
        //  break;
        //case 'HODNOTENIE': filteredValues.add(filter.rating.toString());
        //  break;
      }
    }

    return Array.from(filteredValues)
  }

  getValue(eventHandler: any) {

    if (eventHandler.target.checked) {
      this.filterInnerValue.add(eventHandler.target.value.toString());
    }

    else {
      this.filterInnerValue.delete(eventHandler.target.value.toString());
    }
    
    console.log(this.filterInnerValue);
    return this.filterInnerValue; 
  }
}
