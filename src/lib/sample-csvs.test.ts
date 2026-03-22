import { describe, expect, it } from "vitest";
import { csvStringToFile, getSampleCSV, getSampleNames } from "@/lib/sample-csvs";

describe("sample-csvs", () => {
  it("returns available sample keys", () => {
    const names = getSampleNames();

    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain("books");
  });

  it("returns sample metadata and CSV content for a key", () => {
    const sample = getSampleCSV("books");

    expect(sample.name).toBe("Books");
    expect(sample.data).toContain("title,author,genre");
  });

  it("creates a CSV file from a string", async () => {
    const file = csvStringToFile("a,b\n1,2", "demo");

    expect(file.name).toBe("demo.csv");
    expect(file.type).toBe("text/csv");
    await expect(file.text()).resolves.toContain("a,b");
  });
});
