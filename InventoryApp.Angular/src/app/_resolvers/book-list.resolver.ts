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

export class BookListResolver implements Resolve<Book[]> {

constructor(private bookService: BookService,
            private router: Router,
            private alertify: AlertifyService) { }

  // this will be executed for every route that will use this resolver.
  // RouterStateSnapshot - a tree of activated route snapshots.
  resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
    return this.bookService.getBooks().pipe(
      catchError(err => {
        this.alertify.error('Problem retrieving list of books.');
        this.router.navigate(['/welcome']);
        return of(null);
      })
    );
  }
}
