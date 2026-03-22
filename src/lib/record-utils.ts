import type { DataRecord } from "@/hooks/DataContext";

// Efficient deep clone utility that uses structuredClone when available
export const cloneRecords = (records: DataRecord[]): DataRecord[] => {
  // Use structuredClone if available (modern browsers)
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(records);
  }
  
  // Fallback to manual cloning using Object.assign
  return records.map(record => ({ ...record }));
};

// Efficient comparison for Record objects (works with any columns)
export const recordsAreEqual = (record1: DataRecord, record2: DataRecord): boolean => {
  const keys1 = Object.keys(record1);
  const keys2 = Object.keys(record2);
  
  // Check if they have the same keys
  if (keys1.length !== keys2.length) return false;
  
  // Compare values for all keys
  return keys1.every(key => record1[key] === record2[key]);
};

// Batch comparison for performance (works with any column structure)
export const findModifiedIndices = (currentRecords: DataRecord[], originalRecords: DataRecord[]): Set<number> => {
  const modifiedIndices = new Set<number>();
  
  for (let i = 0; i < currentRecords.length; i++) {
    const currentRecord = currentRecords[i];
    const originalRecord = originalRecords[i];
    
    if (originalRecord && !recordsAreEqual(currentRecord, originalRecord)) {
      modifiedIndices.add(i);
    }
  }
  
  return modifiedIndices;
};
