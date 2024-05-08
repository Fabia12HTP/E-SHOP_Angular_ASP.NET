import { Component, inject } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerachPipePipe } from './serach-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, SerachPipePipe, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomepageComponent {
  activatedRoute = inject(ActivatedRoute);
  shoeService = inject(ShoesService);
  router = inject(Router);

  searchText = '';
  shoes = toSignal(this.shoeService.getShoeList());

  goToShoeDetails(page: number) {
    let currentPage = this.activatedRoute.snapshot.queryParams['page'];
    currentPage = page;

    this.router.navigate(['home/detail'], { queryParams: { page: currentPage } });
  }
}
