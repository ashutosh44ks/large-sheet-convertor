import { type ColumnDef } from "@tanstack/react-table";
import type { DataRecord } from "@/hooks/DataContext";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { EditableCell } from "@/components/data-table-editable-cell";

/**
 * Generate table columns dynamically from column names
 * @param columnNames - Array of column names from CSV headers
 * @returns Array of ColumnDef objects for React Table
 */
export const generateColumnsFromHeaders = (columnNames: string[]): ColumnDef<DataRecord>[] => {
  return columnNames.map((columnName) => ({
    accessorKey: columnName,
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title={columnName}
      />
    ),
    cell: EditableCell,
  }));
};
