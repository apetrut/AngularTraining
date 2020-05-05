/* Defines the book entity */
export interface Book {
    id: number;
    bookTitle: string;
    topic: string;
    ISBN: string;
    tags?: string[];
    publishedDate: string;
    price: number;
    author: string;
    description: string;
    starRating: number;
    bookImageUrl: string;
}

export interface BookResolved {
    book: Book;
    error?: any;
}
