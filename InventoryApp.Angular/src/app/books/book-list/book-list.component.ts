import { Component, OnInit } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  filterForm: FormGroup;
  currentPageTitle = 'Books';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  bookParams: any = {};
  topicList = [
    {value: 'any', display: 'Any'},
    {value: 'art', display: 'Art'},
    {value: 'history', display: 'History'},
    {value: 'science fiction', display: 'Science Fiction'},
    {value: 'violence', display: 'Violence'},
    {value: 'political', display: 'Political'},
    {value: 'romance', display: 'Romance'}
  ];
  pagination: Pagination;

  constructor(private fb: FormBuilder, private bookService: BookService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      minPrice: ['1'],
      maxPrice: ['999'],
      topic: ['Any'],
      orderBy: ['']
    });

    this.bookParams.minPrice = 1;
    this.bookParams.maxPrice = 999;
    this.bookParams.topic = 'Any';
    this.bookParams.orderBy = 'starRating';

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

  resetFilters() {
    this.filterForm.reset();

    this.bookParams.topic = 'any';
    this.bookParams.minPrice = 1;
    this.bookParams.maxPrice = 999;

    this.filterForm.controls.topic.setValue('any');
    this.filterForm.controls.minPrice.setValue(1);
    this.filterForm.controls.maxPrice.setValue(999);

    this.loadBooks();
  }

  applyFilter() {
    this.bookParams.topic = this.filterForm.controls.topic.value;
    this.bookParams.minPrice = this.filterForm.controls.minPrice.value;
    this.bookParams.maxPrice = this.filterForm.controls.maxPrice.value;
    this.loadBooks();
  }

  sort(sortOption: string) {
    this.bookParams.orderBy = sortOption;
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks(this.pagination.currentPage, this.pagination.itemsPerPage, this.bookParams).subscribe(
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
