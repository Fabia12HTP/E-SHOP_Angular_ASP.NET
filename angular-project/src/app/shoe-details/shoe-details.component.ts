import { Component, Input, inject, signal } from '@angular/core';
import { ShoesService } from '../services/shoes.service';
import { CommonModule } from '@angular/common';
import { ShoesCombine } from '../interfaces/shoes-combine';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shoe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoe-details.component.html',
  styleUrl: './shoe-details.component.css'
})
export class ShoeDetailsComponent {
  shoeService = inject(ShoesService);

  @Input('detailPageId') detailPageIdFromRoute: number;

  private destroy$ = new Subject<void>();

  shoesD = signal<ShoesCombine[]>([]);

  ngOnInit(): void {
    this.shoeService.getShoeDetailsList(this.detailPageIdFromRoute)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.shoesD.set(result));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}