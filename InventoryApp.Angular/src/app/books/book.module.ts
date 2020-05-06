import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './book-list.component';
import { BookDetailComponent } from './book-detail.component';
import { BookEditComponent } from './book-edit.component';
import { BookEditInfoComponent } from './book-edit/book-edit-info.component';
import { BookEditTagsComponent } from './book-edit/book-edit-tags.component';
import { bookRoutes } from '../routes';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookEditInfoComponent,
    BookEditTagsComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(bookRoutes)
  ]
})
export class BookModule { }
