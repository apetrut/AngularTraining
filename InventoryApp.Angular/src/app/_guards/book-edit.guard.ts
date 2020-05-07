import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { BookEditComponent } from '../books/book-edit/book-edit.component';

@Injectable({
  providedIn: 'root'
})
export class BookEditGuard implements CanDeactivate<BookEditComponent> {

  canDeactivate(component: BookEditComponent) {
    if (component.bookForm.dirty) {
      const bookTitle = component.bookForm.get('bookTitle').value || 'New Book';
      return confirm(`Navigate away and lose all changes to ${bookTitle}?`);
    }
    return true;
  }
}
