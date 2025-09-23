import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Book } from "@/hooks/BooksContext";
import Papa from "papaparse";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractCSVData = async (file: File): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<Book>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: unknown) => {
        reject(error);
      },
    });
  });
};
