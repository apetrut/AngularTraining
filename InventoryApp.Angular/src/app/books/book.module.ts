import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './book-list.component';
import { BookDetailComponent } from './book-detail.component';
import { BookEditComponent } from './book-edit.component';
import { BookEditInfoComponent } from './book-edit/book-edit-info.component';
import { BookEditTagsComponent } from './book-edit/book-edit-tags.component';
import { BookResolverService } from './book-resolver.service';

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
    RouterModule.forChild([
      { path: 'books', component: BookListComponent },
      {
        path: 'books/:id',
        component: BookDetailComponent,
        resolve: { resolvedData : BookResolverService }
      },
      {
        path: 'books/:id/edit',
         // canDeactivate: [ProductEditGuard],
        component: BookEditComponent,
        children: [
          {
            path: '', // empty path
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: BookEditInfoComponent
          },
          {
            path : 'tags',
            component: BookEditTagsComponent
          }
        ]
      }
    ])
  ]
})
export class BookModule { }

// RESOLVER - ADD THE LINE BELOW TO ADD A RESOLVER TO A SPECIFIC PATH.
// resolve: { resolvedBooks: BookResolverService}
