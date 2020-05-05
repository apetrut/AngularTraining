import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  pageTitle: 'Books';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  
  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // const resolvedData: Book[] = this.route.snapshot.data['resolvedBooks'];
    // this.books = resolvedData;
 
    this.bookService.getBooks().subscribe(
      (data: Book[]) => this.books = data,
      (err: any) => this.errorMessage = err,
      () => console.log('Getting all book completed!')
    ); 
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
