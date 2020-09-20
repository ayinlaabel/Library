import { Component, OnInit } from '@angular/core';
import { StringifyOptions } from 'querystring';

import { Books } from 'src/app/models/books';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public copy: string;


  _listFilter: string;

  

  errorMessage: string;
  books: Books[];
  filteredBooks: Books[];

   get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBooks = this.listFilter ? this.performFilter(this.listFilter) : this.books
  }
  constructor(private bookService: BookService) { }

  performFilter(filterBy: string): Books[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter((book: Books) => 
            book.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.bookService.getBook().subscribe({
      next: books => {
            this.books = books,
            this.filteredBooks = this.books
          },
      error: err => this.errorMessage = err
    });

    
  }
}
