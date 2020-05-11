import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../models/pagination';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = environment.apiUrl + 'books';

  constructor(private http: HttpClient) { }

  getBooks(page?, itemsPerPage?, bookParams?): Observable<PaginatedResult<Book[]>> {
    const paginatedResult: PaginatedResult<Book[]> = new PaginatedResult<Book[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
        params = params.append('pageNumber', page);
        params = params.append('pageSize', itemsPerPage);
    }

    console.log('Book params:' + JSON.stringify(bookParams));
    if (bookParams != null) {
      params = params.append('minPrice', bookParams.minPrice);
      params = params.append('maxPrice', bookParams.maxPrice);
      params = params.append('topic', bookParams.topic);
      params = params.append('orderBy', bookParams.orderBy);
    }

    return this.http.get<Book[]>(this.booksUrl, {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              console.log('Book Service Total items: ' + paginatedResult.pagination.totalItems);
          }
          return paginatedResult;
        })
      );
  }

  getBook(id: number): Observable<Book> {
    if (id === 0) {
      return of(this.initializeBook());
    }
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        tap(data =>
          console.log('getBook: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    book.id = null;
    return this.http.post<Book>(this.booksUrl, book, { headers })
      .pipe(
        tap(data => console.log('createBook: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteBook(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book>(url, { headers })
      .pipe(
        tap(data => console.log('deleteBook: ' + id)),
        catchError(this.handleError)
      );
  }

  updateBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.booksUrl}/${book.id}`;
    return this.http.put<Book>(url, book, { headers })
      .pipe(
        tap(() => console.log('updateBook: ' + book.id)),
        // Return the book on an update
        map(() => book),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;

    // CODE BELOW IS TO DISPLAY FRIENDLY ERROR MESSAGES.
    // let dataError = new BookError();
    // dataError.errorNumber = 100;
    // dataError.message = err.statusText;
    // dataError.friendlyMessage = 'An error occured retrieving data.';

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeBook(): Book {
    // Return an initialized object
    return {
      id: 0,
      ISBN: '',
      author: '',
      bookImageUrl: '',
      bookTitle: '',
      publishedDate: '',
      topic: '',
      tags: [''],
      price: null,
      description: null,
      starRating: null,
    };
  }
}
