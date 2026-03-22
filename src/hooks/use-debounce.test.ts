import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "@/hooks/use-debounce";

describe("useDebounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("runs only the last call inside the delay window", () => {
    vi.useFakeTimers();
    const callback = vi.fn<(value: string) => void>();

    const { result } = renderHook(() => useDebounce(callback, 100));

    act(() => {
      result.current("first");
      result.current("second");
      vi.advanceTimersByTime(99);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("second");
  });

  it("cancels a pending call when a new call arrives", () => {
    vi.useFakeTimers();
    const callback = vi.fn<(value: string) => void>();

    const { result } = renderHook(() => useDebounce(callback, 200));

    act(() => {
      result.current("one");
      vi.advanceTimersByTime(150);
      result.current("two");
      vi.advanceTimersByTime(50);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("two");
  });

  it("passes through latest arguments", () => {
    vi.useFakeTimers();
    const callback = vi.fn<(first: string, second: number) => void>();

    const { result } = renderHook(() => useDebounce(callback, 100));

    act(() => {
      result.current("A", 1);
      result.current("B", 2);
      vi.runAllTimers();
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("B", 2);
  });
});
