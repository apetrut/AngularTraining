import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';
import { BookService } from './book.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BookResolverService implements Resolve<Book[]> {

constructor(private bookService: BookService) { }

  // this will be executed for every route that will use this resolver.
  // RouterStateSnapshot - a tree of activated route snapshots.
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Book[] | Observable<Book[]> | Promise<Book[]> {
    // const id = +route.paramMap.get('id'); // + is to convert the string to a numeric id.
    return this.bookService.getBooks()
    .pipe(
      catchError(err => of(err))
    );
  }
}
