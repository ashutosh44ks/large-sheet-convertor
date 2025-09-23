import { createContext } from "react";

export interface Book {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
}

export type BooksContextType = {
  books: Book[];
  originalBooks: Book[];
  storeBooks: (books: Book[]) => void;
  updateBooks: (books: Book[]) => void;
  resetBooks: () => void;
};
const defaultBooksContext: BooksContextType = {
  books: [],
  originalBooks: [],
  storeBooks: () => {},
  updateBooks: () => {},
  resetBooks: () => {},
};

// Create the context with an initial value of undefined.
// The custom hook will handle the null check.
export const BooksContext =
  createContext<BooksContextType>(defaultBooksContext);
