import type { Book } from "@/hooks/BooksContext";

// Efficient deep clone utility that uses structuredClone when available
export const cloneBooks = (books: Book[]): Book[] => {
  // Use structuredClone if available (modern browsers)
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(books);
  }
  
  // Fallback to manual cloning for better performance than JSON.parse/stringify
  return books.map(book => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    publishedYear: book.publishedYear,
    isbn: book.isbn,
  }));
};

// Efficient comparison for Book objects
export const booksAreEqual = (book1: Book, book2: Book): boolean => {
  return (
    book1.title === book2.title &&
    book1.author === book2.author &&
    book1.genre === book2.genre &&
    book1.publishedYear === book2.publishedYear &&
    book1.isbn === book2.isbn
  );
};

// Batch comparison for performance
export const findModifiedIndices = (currentBooks: Book[], originalBooks: Book[]): Set<number> => {
  const modifiedIndices = new Set<number>();
  
  for (let i = 0; i < currentBooks.length; i++) {
    const currentBook = currentBooks[i];
    const originalBook = originalBooks[i];
    
    if (originalBook && !booksAreEqual(currentBook, originalBook)) {
      modifiedIndices.add(i);
    }
  }
  
  return modifiedIndices;
};
