import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book} from './book';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      { id: 11, name: 'Dr Nice', price: 250, author: 'Songhai', page: 410 },
      { id: 12, name: 'Narco', price: 200, author: 'Songhai', page: 107  },
      { id: 13, name: 'Bombasto', price: 50, author: 'Songhai', page: 109  },
      { id: 14, name: 'Celeritas', price: 350, author: 'Songhai', page: 180  },
      { id: 15, name: 'Magneta', price: 210, author: 'Songhai', page: 108  },
      { id: 16, name: 'RubberMan', price: 750, author: 'Songhai', page: 410  },
      { id: 17, name: 'Dynama', price: 290, author: 'Songhai', page: 140  },
      { id: 18, name: 'Dr IQ', price: 300, author: 'Songhai', page: 150  },
      { id: 19, name: 'Magma', price: 410, author: 'Songhai', page: 110  },
      { id: 20, name: 'Tornado', price: 550, author: 'Songhai', page: 510  }
    ];
    return {books};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}