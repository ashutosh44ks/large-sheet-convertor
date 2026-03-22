import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EditableCell } from "@/components/data-table-editable-cell";
import type { CellContext } from "@tanstack/react-table";
import type { DataRecord } from "@/hooks/DataContext";

const makeContext = (
  value: string,
  updateData: (rowIndex: number, columnId: string, nextValue: unknown) => void
) => {
  return {
    getValue: () => value,
    row: { index: 2 },
    column: { id: "title" },
    table: {
      options: {
        meta: {
          updateData,
        },
      },
    },
  } as unknown as CellContext<DataRecord, unknown>;
};

describe("EditableCell", () => {
  it("updates via table meta on blur", async () => {
    const updateData = vi.fn();

    render(<EditableCell {...makeContext("Initial", updateData)} />);

    const input = screen.getByDisplayValue("Initial");
    await userEvent.clear(input);
    await userEvent.type(input, "Updated");
    await userEvent.tab();

    expect(updateData).toHaveBeenCalledWith(2, "title", "Updated");
  });

  it("syncs local value when external value changes", () => {
    const updateData = vi.fn();
    const { rerender } = render(<EditableCell {...makeContext("A", updateData)} />);

    expect(screen.getByDisplayValue("A")).toBeInTheDocument();

    rerender(<EditableCell {...makeContext("B", updateData)} />);

    expect(screen.getByDisplayValue("B")).toBeInTheDocument();
  });
});
