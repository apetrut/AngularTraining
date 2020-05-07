import { Component, OnInit } from '@angular/core';
import { Book, BookResolved } from '../../models/book';
import { BookService } from '../../_services/book.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'pm-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  pageTitle = 'Book Detail';
  book: Book;

  constructor(private bookService: BookService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.book = data.resolvedBook;
    });

    // const resolvedData: BookResolved = this.route.snapshot.data.resolvedData;
    // this.onBookRetrieved(resolvedData.book);
  }

  onBookRetrieved(book: Book) {
    this.book = book;
  }

  // loadBook(){
  //   this.bookService.getBook(+this.route.snapshot.params.id)
  //       .subscribe((book: Book) => {
  //         this.book = book;
  //       }, error =>{
  //         this.alertify.error(error);
  //       });
  // }
}
