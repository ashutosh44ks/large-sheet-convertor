import { DataTable } from "@/components/data-table";
import { columns } from "@/lib/books-columns";
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
import { useBooksData } from "@/hooks/useBooksData";
import { handleCSVDownload } from "@/lib/utils";
import { LucideUndoDot } from "lucide-react";
import type { Book } from "@/hooks/BooksContext";

const ListingsPage = () => {
  const { books, resetBooks, updateBooks, isRowModified, modifiedRowIndices } =
    useBooksData();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = useState({});
  const updateData = (
    rowIndex: number,
    columnId: keyof Book,
    value: unknown
  ) => {
    const newTableData = [...books];
    // @ts-expect-error - We know the assignment is valid for Book properties
    newTableData[rowIndex][columnId] = value;
    updateBooks(newTableData);
  };
  const table = useReactTable({
    data: books,
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
    (table.getColumn("title")?.getFilterValue() as string) ?? "";
  const hasData = books.length > 0;
  const hasFilteredData = table.getFilteredRowModel().rows.length > 0;

  return (
    <PageContainer>
      <PageHeader
        title="Books Listing"
        description="Manage and view your book collection"
        actions={
          hasData && (
            <Button variant="outline" onClick={() => handleCSVDownload(books)}>
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
                {table.getFilteredRowModel().rows.length.toLocaleString()} books
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
              <Button variant="outline" size="sm" onClick={resetBooks}>
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
                placeholder="Search by title..."
                className="w-full sm:w-64 bg-background"
                value={searchValue}
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
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
