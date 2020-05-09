import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'node_modules/ngx-bootstrap/pagination';

import { StarComponent } from './star.component';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    StarComponent
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    PaginationModule
  ]
})
export class SharedModule { }
