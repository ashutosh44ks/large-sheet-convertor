import { useState, type ReactNode, useCallback } from "react";
import { DataContext, type DataRecord } from "./DataContext";
import { cloneRecords, findModifiedIndices } from "@/lib/record-utils";
import { useDebounce } from "./use-debounce";

interface DataProviderProps {
  children: ReactNode;
  debounceDelay?: number; // Optional debounce for large datasets
}

export const DataProvider = ({ children, debounceDelay = 100 }: DataProviderProps) => {
  const [records, setRecords] = useState<DataRecord[]>([]);
  const [originalRecords, setOriginalRecords] = useState<DataRecord[]>([]);
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [modifiedRowIndices, setModifiedRowIndices] = useState<Set<number>>(new Set());
  
  // Debounced function to update modified indices for large datasets
  const updateModifiedIndices = useCallback((updatedRecords: DataRecord[]) => {
    const newModifiedIndices = findModifiedIndices(updatedRecords, originalRecords);
    setModifiedRowIndices(newModifiedIndices);
  }, [originalRecords]);

  const debouncedUpdateModifiedIndices = useDebounce(updateModifiedIndices, debounceDelay);
  
  const storeRecords = (recordData: DataRecord[], newColumnNames: string[]) => {
    // Efficiently clone the array
    const clonedData = cloneRecords(recordData);
    setOriginalRecords(clonedData);
    setRecords(recordData);
    setColumnNames(newColumnNames);
    setModifiedRowIndices(new Set()); // Clear modified rows when storing new data
  };

  const resetRecords = () => {
    // Clone the original records to avoid reference issues
    setRecords(cloneRecords(originalRecords));
    setModifiedRowIndices(new Set()); // Clear modified rows when resetting
  };

  const updateRecords = (updatedRecords: DataRecord[]) => {
    setRecords(updatedRecords);
    
    // Use debounced update for better performance with large datasets
    if (updatedRecords.length > 1000) {
      debouncedUpdateModifiedIndices(updatedRecords);
    } else {
      // For smaller datasets, update immediately
      const newModifiedIndices = findModifiedIndices(updatedRecords, originalRecords);
      setModifiedRowIndices(newModifiedIndices);
    }
  };

  const isRowModified = (index: number): boolean => {
    return modifiedRowIndices.has(index);
  };

  const contextValue = {
    records,
    originalRecords,
    columnNames,
    modifiedRowIndices,
    storeRecords,
    resetRecords,
    updateRecords,
    isRowModified
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
