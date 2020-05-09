import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';

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
  pagination: Pagination;

  constructor(private bookService: BookService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.books = data.resolvedBooks.result;
      this.pagination = data.resolvedBooks.pagination;
      console.log(this.pagination);
    });
  }

  pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<Book[]>) => {
        this.books = res.result;
        this.pagination = res.pagination;
      },
      (err: any) => this.errorMessage = err,
      () => this.alertify.success('Getting books for page: ' + this.pagination.currentPage  + ' completed!')
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
