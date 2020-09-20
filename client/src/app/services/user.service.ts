import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User[];
  baseUrl: string = 'http://localhost:3000/users/'

  constructor(private http: HttpClient) { }


  createUser(user: User) : Observable<User>{

    return this.http.post<User>(`${this.baseUrl}signup`, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    })
      .pipe(catchError(this.handleError))
  }


  loginUser(username: string, password: string): Observable<boolean> {
      return this.http.post<{token: string}>(`${this.baseUrl}login`, {username: username, password: password})
              .pipe(
                map(result => {
                  if(result) {
                    let token = result.token
                    // console.log(JSON.parse(token))
                    localStorage.setItem('currentUser', JSON.stringify(token));
                    return true;
                  }
                })
              )
  }

  loggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  getToken() {
    return localStorage.getItem('currentUser')
  }


  getUserDetails() : Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/nav').pipe(
      tap(user => JSON.stringify('User Details: ' + user)),
      catchError(this.handleError)
    )
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
