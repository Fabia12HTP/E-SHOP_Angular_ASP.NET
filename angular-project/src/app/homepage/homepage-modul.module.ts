import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { SerachPipe } from './pipes/serach-pipe.pipe';

@NgModule({
  declarations: [    
    SerachPipe,
    NgModule,
    HomepageComponent],
  imports: [
    CommonModule,
  ]
})
export class HomepageModulModule { }
