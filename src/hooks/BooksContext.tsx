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
  modifiedRowIndices: Set<number>;
  storeBooks: (books: Book[]) => void;
  updateBooks: (books: Book[]) => void;
  resetBooks: () => void;
  isRowModified: (index: number) => boolean;
};
const defaultBooksContext: BooksContextType = {
  books: [],
  originalBooks: [],
  modifiedRowIndices: new Set(),
  storeBooks: () => {},
  updateBooks: () => {},
  resetBooks: () => {},
  isRowModified: () => false,
};

// Create the context with an initial value of undefined.
// The custom hook will handle the null check.
export const BooksContext =
  createContext<BooksContextType>(defaultBooksContext);
