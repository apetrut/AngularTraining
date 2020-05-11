import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'node_modules/ngx-bootstrap/pagination';
import { ButtonsModule } from 'node_modules/ngx-bootstrap/buttons';

import { StarComponent } from './star.component';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    StarComponent
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    PaginationModule,
    ButtonsModule
  ]
})
export class SharedModule { }
