import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentPageTitle = 'Books';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  constructor(private bookService: BookService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.books = data.resolvedBooks;
    });

    // const resolvedData: Book[] = this.route.snapshot.data['resolvedBooks'];
    // this.books = resolvedData;
    // this.bookService.getBooks().subscribe(
    //   (data: Book[]) => this.books = data,
    //   (err: any) => this.errorMessage = err,
    //   () => console.log('Getting all book completed!')
    // );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
