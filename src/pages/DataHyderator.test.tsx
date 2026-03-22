import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DataHyderator from "@/pages/DataHyderator";

const storeRecordsMock = vi.fn();
const extractCSVDataMock = vi.fn();

vi.mock("@/hooks/useDataContext", () => ({
  useDataContext: () => ({
    storeRecords: storeRecordsMock,
  }),
}));

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();
  return {
    ...actual,
    extractCSVData: (...args: unknown[]) => extractCSVDataMock(...args),
  };
});

describe("DataHyderator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads a sample, stores records, and shows success stats", async () => {
    extractCSVDataMock.mockResolvedValue({
      columnNames: ["title"],
      data: [{ title: "Book A" }, { title: "Book B" }],
      timeTaken: 1250,
    });

    render(
      <MemoryRouter>
        <DataHyderator />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: "Books" }));

    await waitFor(() => {
      expect(storeRecordsMock).toHaveBeenCalledWith(
        [{ title: "Book A" }, { title: "Book B" }],
        ["title"]
      );
    });

    expect(screen.getByText("Upload Successful!")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1.25")).toBeInTheDocument();
  });

  it("submits an uploaded file and stores parsed data", async () => {
    extractCSVDataMock.mockResolvedValue({
      columnNames: ["name"],
      data: [{ name: "Alice" }],
      timeTaken: 500,
    });

    const { container } = render(
      <MemoryRouter>
        <DataHyderator />
      </MemoryRouter>
    );

    const fileInput = container.querySelector("input[type='file']") as HTMLInputElement;
    const form = container.querySelector("form") as HTMLFormElement;
    const file = new File(["name\nAlice"], "users.csv", { type: "text/csv" });

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(extractCSVDataMock).toHaveBeenCalledWith(file);
      expect(storeRecordsMock).toHaveBeenCalledWith([{ name: "Alice" }], ["name"]);
    });
  });
});
