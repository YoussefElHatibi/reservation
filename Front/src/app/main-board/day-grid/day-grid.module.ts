import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayGridComponent } from './day-grid.component';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [DayGridComponent],
  imports: [
    CommonModule,
    MatGridListModule
  ],
  exports: [DayGridComponent],
})
export class DayGridModule { }
