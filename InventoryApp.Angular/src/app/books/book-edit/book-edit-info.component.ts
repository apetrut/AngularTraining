import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './book-edit-info.component.html'
})
export class BookEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) bookForm: NgForm; // obtain a reference to the form.

  errorMessage: string;
  book: Book;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the data from the parent's route.
    this.route.parent.data.subscribe(data => {

    if (this.bookForm) {
        this.bookForm.reset();
    }

    this.book = data.resolvedData.book;
    });
  }
}
