import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DataRecord } from "@/hooks/DataContext";
import Papa from "papaparse";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractCSVData = async (
  file: File
): Promise<{ columnNames: string[]; data: DataRecord[]; timeTaken: number }> => {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const endTime = performance.now();
        const columnNames = results.meta.fields || [];
        resolve({
          columnNames,
          data: results.data as DataRecord[],
          timeTaken: endTime - startTime,
        });
      },
      error: (error: unknown) => {
        reject(error);
      },
    });
  });
};

export const handleCSVDownload = (records: DataRecord[]) => {
  const csv = Papa.unparse(records);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "edited_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
