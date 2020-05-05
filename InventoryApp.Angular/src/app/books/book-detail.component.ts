import { Component, OnInit } from '@angular/core';
import { Book, BookResolved } from '../models/book';
import { BookService } from './book.service';
import { ActivatedRoute } from '@angular/router';
import { BookResolverService } from './book-resolver.service';

@Component({
  selector: 'pm-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  pageTitle = 'Book Detail';
  book: Book;
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: BookResolved = this.route.snapshot.data.resolvedData;
    this.errorMessage = resolvedData.error;
    this.onBookRetrieved(resolvedData.book);
  }
  onBookRetrieved(book: Book) {
    this.book = book;
  }

  getBook(id: number){

  }
}
