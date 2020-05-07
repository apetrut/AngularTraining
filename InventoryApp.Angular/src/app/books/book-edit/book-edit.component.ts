import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { BookService } from '../../_services/book.service';

@Component({
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Book Edit';
  errorMessage: string;
  bookForm: FormGroup;

  book: Book;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.bookForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      bookTitle: {
        required: 'book title is required.',
        minlength: 'book title must be at least three characters.',
        maxlength: 'book title cannot exceed 50 characters.'
      },
      ISBN: {
        required: 'ISBN is required.'
      },
      starRating: {
        range: 'Rate the book between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  // ensure the component + templates are initialized before the form model.
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      bookName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      bookCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]), 
      description: ''
    });

    // Read the book Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getBook(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.bookForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.bookForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getBook(id: number): void {
    this.bookService.getBook(id)
      .subscribe({
        next: (book: Book) => this.displayBook(book),
        error: err => this.errorMessage = err
      });
  }

  displayBook(book: Book): void {
    if (this.bookForm) {
      this.bookForm.reset();
    }
    this.book = book;

    if (this.book.id === 0) {
      this.pageTitle = 'Add book';
    } else {
      this.pageTitle = `Edit book: ${this.book.bookTitle}`;
    }

    // Update the data on the form
    this.bookForm.patchValue({
      bookName: this.book.bookTitle,
      ISBN: this.book.ISBN,
      starRating: this.book.starRating,
      description: this.book.description
    });
    this.bookForm.setControl('tags', this.fb.array(this.book.tags || []));
  }

  deleteBook(): void {
    if (this.book.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the book: ${this.book.bookTitle}?`)) {
        this.bookService.deleteBook(this.book.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      if (this.bookForm.dirty) {

        // create a new book object, overwriting any values from the form.
        const p = { ...this.book, ...this.bookForm.value };

        if (p.id === 0) {
          this.bookService.createBook(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.bookService.updateBook(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.bookForm.reset();
    this.router.navigate(['/books']);
  }
}
