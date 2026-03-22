import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Papa from "papaparse";
import { extractCSVData, handleCSVDownload } from "@/lib/utils";

vi.mock("papaparse", () => ({
  default: {
    parse: vi.fn(),
    unparse: vi.fn(),
  },
}));

describe("utils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("extractCSVData resolves parsed data and headers", async () => {
    // Mock Papa.parse to call the complete callback with sample data
    // We do this instead of actually parsing a file to keep the test fast and focused on our logic
    // and not on Papa's parsing correctness
    const parseSpy = Papa.parse as unknown as ReturnType<typeof vi.fn>;
    parseSpy.mockImplementation((file: File, options: { complete?: (results: unknown, file: File) => void }) => {
      options.complete?.(
        {
          data: [{ title: "1984" }],
          errors: [],
          meta: { fields: ["title"] },
        },
        file
      );
    });

    // Call the function with a sample file
    const file = new File(["title\n1984"], "books.csv", { type: "text/csv" });
    const result = await extractCSVData(file);

    expect(result.columnNames).toEqual(["title"]);
    expect(result.data).toEqual([{ title: "1984" }]);
    expect(result.timeTaken).toBeGreaterThanOrEqual(0);
  });

  it("extractCSVData rejects parser errors", async () => {
    const parseSpy = Papa.parse as unknown as ReturnType<typeof vi.fn>;

    parseSpy.mockImplementation((_file: File, options: { error?: (error: Error) => void }) => {
      options.error?.(new Error("parse failed"));
    });

    const file = new File(["bad"], "bad.csv", { type: "text/csv" });

    await expect(extractCSVData(file)).rejects.toThrow("parse failed");
  });

  it("handleCSVDownload creates and clicks a download link", () => {
    // Mock Papa.unparse to return a simple CSV string
    const unparseSpy = vi.mocked(Papa.unparse);
    unparseSpy.mockReturnValue("title\n1984");

    // Spy on URL.createObjectURL and the anchor click to verify they are called correctly
    const createObjectURLSpy = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:test-url");
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    const appendSpy = vi.spyOn(document.body, "appendChild");
    const removeSpy = vi.spyOn(document.body, "removeChild");

    handleCSVDownload([{ title: "1984" }]);

    expect(unparseSpy).toHaveBeenCalledWith([{ title: "1984" }]);
    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(appendSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);

    const link = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(link.download).toBe("edited_data.csv");
    expect(link.href).toBe("blob:test-url");
  });
});
