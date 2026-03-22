import { DataTable } from "@/components/data-table";
import { generateColumnsFromHeaders } from "@/lib/table-columns";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import {
  PageToolbar,
  ToolbarSection,
  ToolbarActions,
} from "@/components/page-toolbar";
import { PageContainer, PageSection } from "@/components/page-container";
import { NoDataState, NoSearchResultsState } from "@/components/empty-state";
import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  getFilteredRowModel,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDownload, IconFilter } from "@tabler/icons-react";
import { useDataContext } from "@/hooks/useDataContext";
import { handleCSVDownload } from "@/lib/utils";
import { LucideUndoDot } from "lucide-react";

const ListingsPage = () => {
  const {
    records,
    columnNames,
    resetRecords,
    updateRecords,
    isRowModified,
    modifiedRowIndices,
  } = useDataContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = useState({});
  
  // Generate columns dynamically from columnNames
  const columns = generateColumnsFromHeaders(columnNames);
  const firstColumnName = columnNames[0] || "title"; // Fallback to "title" if no columns
  
  const updateData = (
    rowIndex: number,
    columnId: string | number,
    value: unknown
  ) => {
    const newTableData = [...records];
    newTableData[rowIndex][String(columnId)] = String(value);
    updateRecords(newTableData);
  };
  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      // rowSelection,
    },
    meta: {
      updateData,
      isRowModified,
    },
  });

  const searchValue =
    (table.getColumn(firstColumnName)?.getFilterValue() as string) ?? "";
  const hasData = records.length > 0;
  const hasFilteredData = table.getFilteredRowModel().rows.length > 0;

  return (
    <PageContainer>
      <PageHeader
        title="Data Listing"
        description="Efficiently manage and view your large collections of data"
        actions={
          hasData && (
            <Button variant="outline" onClick={() => handleCSVDownload(records)}>
              <IconDownload size={16} />
              Export CSV
            </Button>
          )
        }
      />
      {!hasData ? (
        <PageSection>
          <NoDataState />
        </PageSection>
      ) : (
        <>
          <PageToolbar>
            <ToolbarSection>
              <span className="text-sm font-medium">
                Collection of{" "}
                {table.getFilteredRowModel().rows.length.toLocaleString()} records
              </span>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  (
                  {table
                    .getFilteredSelectedRowModel()
                    .rows.length.toLocaleString()}{" "}
                  selected)
                </span>
              )}
              {modifiedRowIndices.size > 0 && (
                <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  ({modifiedRowIndices.size} modified)
                </span>
              )}
            </ToolbarSection>
            <ToolbarActions>
              <Button variant="outline" size="sm" onClick={resetRecords}>
                <LucideUndoDot size={16} />
                Reset all changes
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <IconFilter size={16} />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                placeholder={`Search by ${firstColumnName}...`}
                className="w-full sm:w-64 bg-background"
                value={searchValue}
                onChange={(event) =>
                  table.getColumn(firstColumnName)?.setFilterValue(event.target.value)
                }
              />
            </ToolbarActions>
          </PageToolbar>
          <PageSection>
            {!hasFilteredData && searchValue ? (
              <NoSearchResultsState searchTerm={searchValue} />
            ) : (
              <DataTable columns={columns} table={table} />
            )}
          </PageSection>
        </>
      )}
    </PageContainer>
  );
};

export default ListingsPage;
