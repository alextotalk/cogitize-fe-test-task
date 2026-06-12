import { renderHook } from "@testing-library/react";
import { useThrottledCallback } from "../useThrottledCallback";

describe("useThrottledCallback", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("fires the first call immediately (leading edge)", () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useThrottledCallback(fn, 600));

    result.current.throttled("a");

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("fires at most once per window and delivers the last value (trailing edge)", () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useThrottledCallback(fn, 600));

    result.current.throttled("first");
    jest.advanceTimersByTime(100);
    result.current.throttled("second");
    jest.advanceTimersByTime(100);
    result.current.throttled("third");

    // Only the leading call has happened so far.
    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(600);

    // The trailing call delivers the latest skipped value.
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("third");
  });

  it("allows the next immediate call after the window has passed", () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useThrottledCallback(fn, 600));

    result.current.throttled("a");
    jest.advanceTimersByTime(700);
    result.current.throttled("b");

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("b");
  });

  it("cancel() drops the pending trailing call", () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useThrottledCallback(fn, 600));

    result.current.throttled("a");
    result.current.throttled("b");
    result.current.cancel();

    jest.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("cleans up the pending call on unmount", () => {
    const fn = jest.fn();
    const { result, unmount } = renderHook(() => useThrottledCallback(fn, 600));

    result.current.throttled("a");
    result.current.throttled("b");
    unmount();

    jest.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
