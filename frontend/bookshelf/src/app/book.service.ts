import { Injectable } from '@angular/core';
import { Book } from './book';
import { BOOKS } from './mock-books';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(_ => this.log('fetched books')),
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}${id}/`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  private booksUrl = 'http://localhost:8000/books/';  // URL to web api

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /** PUT: update the hero on the server */
updateBook(book: Book): Observable<any> {
  const url = `${this.booksUrl}${book.id}/`;
  return this.http.put(url, book, this.httpOptions).pipe(
    tap(_ => this.log(`updated book id=${book.id}`)),
    catchError(this.handleError<any>('updateBook'))
  );
}

/** POST: add a new hero to the server */
addBook(book: Book): Observable<Book> {
  return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
    tap((newBook: Book) => this.log(`added book w/ id=${newBook.id}`)),
    catchError(this.handleError<Book>('addBook'))
  );
}

/** DELETE: delete the hero from the server */
deleteBook(id: number): Observable<Book> {
  const url = `${this.booksUrl}${id}/`;

  return this.http.delete<Book>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted book id=${id}`)),
    catchError(this.handleError<Book>('deleteBook'))
  );
}

/* GET heroes whose name contains search term */
searchBooks(term: string): Observable<Book[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Book[]>(`${this.booksUrl}search/?_name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found books matching "${term}"`) :
       this.log(`no books matching "${term}"`)),
    catchError(this.handleError<Book[]>('searchBooks', []))
  );
}
}