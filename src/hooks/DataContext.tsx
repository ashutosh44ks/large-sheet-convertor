import { createContext } from "react";

// Generic record type to support any CSV structure.
export type DataRecord = { [key: string]: string };

export type DataContextType = {
  records: DataRecord[];
  originalRecords: DataRecord[];
  columnNames: string[];
  modifiedRowIndices: Set<number>;
  storeRecords: (records: DataRecord[], columnNames: string[]) => void;
  updateRecords: (records: DataRecord[]) => void;
  resetRecords: () => void;
  isRowModified: (index: number) => boolean;
};
const defaultDataContext: DataContextType = {
  records: [],
  originalRecords: [],
  columnNames: [],
  modifiedRowIndices: new Set(),
  storeRecords: () => {},
  updateRecords: () => {},
  resetRecords: () => {},
  isRowModified: () => false,
};

// Create the context with an initial value of undefined.
// The custom hook will handle the null check.
export const DataContext =
  createContext<DataContextType>(defaultDataContext);
