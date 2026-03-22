import { describe, expect, it } from "vitest";
import { cloneRecords, findModifiedIndices, recordsAreEqual } from "@/lib/record-utils";

describe("record-utils", () => {
  it("clones records without preserving object references", () => {
    const original = [{ title: "Book A", author: "Author A" }];

    const cloned = cloneRecords(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[0]).not.toBe(original[0]);

    cloned[0].title = "Changed";
    expect(original[0].title).toBe("Book A");
  });

  it("compares records with the same shape and values as equal", () => {
    const left = { title: "1984", author: "Orwell" };
    const right = { author: "Orwell", title: "1984" };

    expect(recordsAreEqual(left, right)).toBe(true);
  });

  it("returns false when record keys differ", () => {
    const left = { title: "1984", author: "Orwell" };
    const right = { title: "1984" };

    expect(recordsAreEqual(left, right)).toBe(false);
  });

  it("finds modified indices for changed rows only", () => {
    const original = [
      { id: "1", title: "A" },
      { id: "2", title: "B" },
      { id: "3", title: "C" },
    ];

    const current = [
      { id: "1", title: "A" },
      { id: "2", title: "Updated" },
      { id: "3", title: "C" },
    ];

    const modified = findModifiedIndices(current, original);

    expect(Array.from(modified)).toEqual([1]);
  });

  it("ignores appended rows that do not exist in original records", () => {
    const original = [{ id: "1", title: "A" }];
    const current = [
      { id: "1", title: "A" },
      { id: "2", title: "B" },
    ];

    const modified = findModifiedIndices(current, original);

    expect(Array.from(modified)).toEqual([]);
  });
});
