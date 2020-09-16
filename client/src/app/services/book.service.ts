import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

import { Books } from '../models/books'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookUrl = 'http://localhost:3000/'
  books: Books[];

  constructor(private http: HttpClient) { }

  getBook(): Observable<Books[]>{
    return this.http.get<Books[]>(`${this.bookUrl}books`).pipe(
      tap(book => JSON.stringify('All: ' + JSON.stringify(book))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    //in a real world app, we may send the server to some remote logging infrastructure
    //instead of just logging it to the console
    let errorMessage = '';
      if(err.error instanceof ErrorEvent) {
        // A client-side or network error  occurred. Handle it accordingly
        errorMessage =  `An error ocurred: ${err.error.message}`;
      }else{
        //The backend returned an unsuiccessful response code.
        //The responed body may contain clues as what went wrong
        errorMessage = `Server returned code: ${err.status}, error messages is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
  }
}
