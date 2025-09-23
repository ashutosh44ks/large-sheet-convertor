import { use } from "react";
import { BooksContext, type BooksContextType } from "./BooksContext";

export const useBooksData = (): BooksContextType => {
  const context = use(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }

  return context;
};
