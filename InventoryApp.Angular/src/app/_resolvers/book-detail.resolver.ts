import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { BookService } from '../_services/book.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})

export class BookDetailResolver implements Resolve<Book> {

constructor(private bookService: BookService,
            private router: Router,
            private alertify: AlertifyService) { }

  // RouterStateSnapshot - a tree of activated route snapshots.
  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    return this.bookService.getBook(route.params.id)
    .pipe(
      catchError(err => {
          this.alertify.error('Unable to get the book details.');
          this.router.navigate(['/books']);
          return of(null);
      }));
  }
}
