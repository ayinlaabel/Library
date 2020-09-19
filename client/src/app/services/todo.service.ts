import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Todo } from '../models/todo';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo: Todo;
  baseUrl = 'http://localhost:3000/users/'

  constructor(private http: HttpClient) { }

  getTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.baseUrl}todos`).pipe(
      tap(todo => JSON.stringify(todo)),
      catchError(this.handleError)
    );
  }

  createTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(`${this.baseUrl}addTodo`, todo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError))
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
