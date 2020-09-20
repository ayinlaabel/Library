import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/models/books';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public copy: string;

  errorMessage: string;
  books: Books[];
  filteredBook: Books[];
   
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBook().subscribe({
      next: books => this.books = books,
      error: err => this.errorMessage = err
    });
    
    this.filteredBook = this.books;
  }
}
