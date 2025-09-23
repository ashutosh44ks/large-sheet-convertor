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

const ListingsPage = () => {
  const { books } = useBooksData();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
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
                Collection of {table.getFilteredRowModel().rows.length.toLocaleString()} books
              </span>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({table.getFilteredSelectedRowModel().rows.length.toLocaleString()} selected)
                </span>
              )}
            </ToolbarSection>
            <ToolbarActions>
              <Input
                placeholder="Search by title..."
                className="w-full sm:w-64 bg-background"
                value={searchValue}
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
              />
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
