import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeDetailsComponent } from './shoe-details.component';

describe('ShoeDetailsComponent', () => {
  let component: ShoeDetailsComponent;
  let fixture: ComponentFixture<ShoeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
