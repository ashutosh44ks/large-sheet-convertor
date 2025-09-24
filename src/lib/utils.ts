import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Book } from "@/hooks/BooksContext";
import Papa from "papaparse";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractCSVData = async (file: File): Promise<{ data: Book[]; timeTaken: number }> => {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    Papa.parse<Book>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const endTime = performance.now();
        resolve({
          data: results.data,
          timeTaken: endTime - startTime,
        });
      },
      error: (error: unknown) => {
        reject(error);
      },
    });
  });
};

export const handleCSVDownload = (books: Book[]) => {
  const csv = Papa.unparse(books);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "edited_books.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
