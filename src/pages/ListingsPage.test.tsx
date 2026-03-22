import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ListingsPage from "@/pages/ListingsPage";

const resetRecordsMock = vi.fn();
const updateRecordsMock = vi.fn();
const handleCSVDownloadMock = vi.fn();

const useDataContextMock = vi.fn();

vi.mock("@/hooks/useDataContext", () => ({
  useDataContext: () => useDataContextMock(),
}));

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    handleCSVDownload: (...args: unknown[]) => handleCSVDownloadMock(...args),
  };
});

describe("ListingsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders no-data state when records are empty", () => {
    useDataContextMock.mockReturnValue({
      records: [],
      columnNames: ["title"],
      resetRecords: resetRecordsMock,
      updateRecords: updateRecordsMock,
      isRowModified: () => false,
      modifiedRowIndices: new Set<number>(),
    });

    render(
      <MemoryRouter>
        <ListingsPage />
      </MemoryRouter>
    );

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("supports search, reset, modified counter, and export", async () => {
    const records = [
      { title: "Alpha", author: "Author 1" },
      { title: "Beta", author: "Author 2" },
    ];

    useDataContextMock.mockReturnValue({
      records,
      columnNames: ["title", "author"],
      resetRecords: resetRecordsMock,
      updateRecords: updateRecordsMock,
      isRowModified: (index: number) => index === 1,
      modifiedRowIndices: new Set<number>([1]),
    });

    render(
      <MemoryRouter>
        <ListingsPage />
      </MemoryRouter>
    );

    expect(screen.getByText("(1 modified)")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Reset all changes/i }));
    expect(resetRecordsMock).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole("button", { name: /Export CSV/i }));
    expect(handleCSVDownloadMock).toHaveBeenCalledWith(records);

    const searchInput = screen.getByPlaceholderText("Search by title...");
    await userEvent.type(searchInput, "zzz");

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });
});
