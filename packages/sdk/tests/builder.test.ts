import { ApiClient } from "../src/builder";

describe("ApiClient response timeout", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("times out if the server sends headers but stalls the response body", async () => {
    jest.useFakeTimers();
    let signal: AbortSignal | undefined;
    const readBody = jest.fn(
      () =>
        new Promise<string>((_, reject) => {
          signal?.addEventListener(
            "abort",
            () => reject(new DOMException("The operation was aborted.", "AbortError")),
            { once: true },
          );
        }),
    );
    jest.spyOn(globalThis, "fetch").mockImplementation(async (_input, init) => {
      signal = init?.signal ?? undefined;
      const response = new Response(null, { status: 200 });
      jest.spyOn(response, "text").mockImplementation(readBody);
      return response;
    });

    const result = new ApiClient("https://example.invalid/").request("health", "GET", {
      timeout: 100,
    });
    const settled = result.catch((error: unknown) => error);

    await jest.advanceTimersByTimeAsync(0);
    expect(readBody).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(100);
    expect(signal?.aborted).toBe(true);
    await expect(settled).resolves.toMatchObject({ code: "TIMEOUT", status: 408 });
  });

  it("clears the timer after a successful response", async () => {
    jest.useFakeTimers();
    jest.spyOn(globalThis, "fetch").mockResolvedValue(new Response('{"ok":true}'));

    await expect(new ApiClient("https://example.invalid/").request("health", "GET")).resolves.toEqual({
      ok: true,
    });
    expect(jest.getTimerCount()).toBe(0);
  });
});
