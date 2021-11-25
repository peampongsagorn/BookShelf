import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
//import { BOOKS } from '../mock-books';
import { BookService } from '../book.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBook?: Book;
  //selectedBook: any;
  //bookService: any;

  constructor(private bookService: BookService,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
    this.messageService.add(`HeroesComponent: Selected hero id=${book.id}`);
  }

  getBooks(): void {
    this.bookService.getBooks()
        .subscribe(books => this.books = books);
  }

}