/// <reference types="vite/client" />

import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: keyof TData, value: unknown) => void
    isRowModified: (index: number) => boolean
  }
}