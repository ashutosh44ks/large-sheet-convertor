import { useState, type ReactNode, useCallback } from "react";
import { BooksContext, type Book } from "./BooksContext";
import { cloneBooks, findModifiedIndices } from "@/lib/book-utils";
import { useDebounce } from "./use-debounce";

interface BooksProviderProps {
  children: ReactNode;
  debounceDelay?: number; // Optional debounce for large datasets
}

export const BooksProvider = ({ children, debounceDelay = 100 }: BooksProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [originalBooks, setOriginalBooks] = useState<Book[]>([]);
  const [modifiedRowIndices, setModifiedRowIndices] = useState<Set<number>>(new Set());
  
  // Debounced function to update modified indices for large datasets
  const updateModifiedIndices = useCallback((updatedBooks: Book[]) => {
    const newModifiedIndices = findModifiedIndices(updatedBooks, originalBooks);
    setModifiedRowIndices(newModifiedIndices);
  }, [originalBooks]);

  const debouncedUpdateModifiedIndices = useDebounce(updateModifiedIndices, debounceDelay);
  
  const storeBooks = (bookData: Book[]) => {
    // Efficiently clone the array
    const clonedData = cloneBooks(bookData);
    setOriginalBooks(clonedData);
    setBooks(bookData);
    setModifiedRowIndices(new Set()); // Clear modified rows when storing new data
  };

  const resetBooks = () => {
    // Clone the original books to avoid reference issues
    setBooks(cloneBooks(originalBooks));
    setModifiedRowIndices(new Set()); // Clear modified rows when resetting
  };

  const updateBooks = (updatedBooks: Book[]) => {
    setBooks(updatedBooks);
    
    // Use debounced update for better performance with large datasets
    if (updatedBooks.length > 1000) {
      debouncedUpdateModifiedIndices(updatedBooks);
    } else {
      // For smaller datasets, update immediately
      const newModifiedIndices = findModifiedIndices(updatedBooks, originalBooks);
      setModifiedRowIndices(newModifiedIndices);
    }
  };

  const isRowModified = (index: number): boolean => {
    return modifiedRowIndices.has(index);
  };

  const contextValue = { 
    books, 
    originalBooks, 
    modifiedRowIndices,
    storeBooks, 
    resetBooks, 
    updateBooks,
    isRowModified
  };

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
