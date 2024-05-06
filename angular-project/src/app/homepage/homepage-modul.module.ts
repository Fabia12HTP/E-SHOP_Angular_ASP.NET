import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerachPipePipe } from 'src/app/homepage/serach-pipe.pipe';
import { HomepageComponent } from './homepage.component';



@NgModule({
  declarations: [    
    SerachPipePipe,
    NgModule,
    HomepageComponent],
  imports: [
    CommonModule,

  ]
})
export class HomepageModulModule { }
