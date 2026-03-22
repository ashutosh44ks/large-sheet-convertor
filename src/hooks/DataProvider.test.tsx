import { act, render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataProvider } from "@/hooks/DataProvider";
import { useDataContext } from "@/hooks/useDataContext";
import type { DataContextType } from "@/hooks/DataContext";

interface ProbeProps {
  onValue: (value: DataContextType) => void;
}

const Probe = ({ onValue }: ProbeProps) => {
  const context = useDataContext();

  useEffect(() => {
    onValue(context);
  }, [context, onValue]);

  return null;
};

describe("DataProvider", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("stores records and resets modified state", async () => {
    let latest: DataContextType | undefined;

    render(
      <DataProvider>
        <Probe onValue={(value) => {
          latest = value;
        }} />
      </DataProvider>
    );

    act(() => {
      latest?.storeRecords([{ id: "1", title: "A" }], ["id", "title"]);
    });

    await waitFor(() => {
      expect(latest?.records).toEqual([{ id: "1", title: "A" }]);
      expect(latest?.columnNames).toEqual(["id", "title"]);
      expect(latest?.modifiedRowIndices.size).toBe(0);
    });
  });

  it("tracks modified indices immediately for small datasets", async () => {
    let latest: DataContextType | undefined;

    render(
      <DataProvider>
        <Probe onValue={(value) => {
          latest = value;
        }} />
      </DataProvider>
    );

    act(() => {
      latest?.storeRecords(
        [
          { id: "1", title: "A" },
          { id: "2", title: "B" },
        ],
        ["id", "title"]
      );
    });

    act(() => {
      latest?.updateRecords([
        { id: "1", title: "A" },
        { id: "2", title: "B-UPDATED" },
      ]);
    });

    await waitFor(() => {
      expect(latest?.modifiedRowIndices.has(1)).toBe(true);
      expect(latest?.isRowModified(1)).toBe(true);
    });
  });

  it("resets records to the original snapshot", async () => {
    let latest: DataContextType | undefined;

    render(
      <DataProvider>
        <Probe onValue={(value) => {
          latest = value;
        }} />
      </DataProvider>
    );

    act(() => {
      latest?.storeRecords([{ id: "1", title: "A" }], ["id", "title"]);
    });

    act(() => {
      latest?.updateRecords([{ id: "1", title: "Changed" }]);
    });

    act(() => {
      latest?.resetRecords();
    });

    await waitFor(() => {
      expect(latest?.records).toEqual([{ id: "1", title: "A" }]);
      expect(latest?.modifiedRowIndices.size).toBe(0);
    });
  });

  it("debounces modified index updates for large datasets", async () => {
    vi.useFakeTimers();
    let latest: DataContextType | undefined;

    render(
      <DataProvider debounceDelay={100}>
        <Probe onValue={(value) => {
          latest = value;
        }} />
      </DataProvider>
    );

    const original = Array.from({ length: 1001 }, (_, index) => ({
      id: String(index),
      value: String(index),
    }));

    const updated = original.map((row) => ({ ...row }));
    updated[500] = { ...updated[500], value: "changed" };

    act(() => {
      latest?.storeRecords(original, ["id", "value"]);
    });

    act(() => {
      latest?.updateRecords(updated);
    });

    expect(latest?.modifiedRowIndices.size).toBe(0);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    await Promise.resolve();
    expect(latest?.modifiedRowIndices.has(500)).toBe(true);
  });
});
