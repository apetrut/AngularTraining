import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookEditInfoComponent } from './book-edit/book-edit-info.component';
import { BookEditTagsComponent } from './book-edit/book-edit-tags.component';
import { bookRoutes } from '../routes';
import { BookCardComponent } from './book-card/book-card.component';
import { TabsModule } from 'node_modules/ngx-bootstrap/tabs';
import { BookDetailResolver } from '../_resolvers/book-detail.resolver';
import { BookListResolver } from '../_resolvers/book-list.resolver';

@NgModule({
  declarations: [
    BookListComponent,
    BookCardComponent,
    BookDetailComponent,
    BookEditComponent,
    BookEditInfoComponent,
    BookEditTagsComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TabsModule,
    RouterModule.forChild(bookRoutes)
  ],
  providers: [
    BookDetailResolver,
    BookListResolver]
})
export class BookModule { }
