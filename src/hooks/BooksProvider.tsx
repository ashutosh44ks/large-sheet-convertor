import { useState, type ReactNode } from "react";
import { BooksContext, type Book } from "./BooksContext";

interface BooksProviderProps {
  children: ReactNode;
}
export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [originalBooks, setOriginalBooks] = useState<Book[]>([]);

  const storeBooks = (bookData: Book[]) => {
    setOriginalBooks(bookData);
    setBooks(bookData);
  };
  const resetBooks = () => {
    setBooks(originalBooks);
  };

  const contextValue = { books, originalBooks, storeBooks, resetBooks };

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
