import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect, vi, afterEach } from "vitest";
import worker, { sorries } from "../src/index";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

async function callWorker(): Promise<Response> {
	const request = new IncomingRequest("http://example.com");
	// Create an empty context to pass to `worker.fetch()`.
	const ctx = createExecutionContext();
	const response = await worker.fetch(request, env, ctx);
	// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
	await waitOnExecutionContext(ctx);
	return response;
}

describe("Sorry worker", () => {
	it("responds with a sorry (unit style)", async () => {
		const response = await callWorker();
		expect(response.headers.get("content-type")).toBe(
			"text/plain; charset=utf-8",
		);
		expect(sorries).toContain(await response.text());
	});

	it("responds with a sorry (integration style)", async () => {
		const response = await SELF.fetch("https://example.com");
		expect(sorries).toContain(await response.text());
	});
});

describe("Sorry worker random pick", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("returns the first entry when Math.random is 0", async () => {
		vi.spyOn(Math, "random").mockReturnValue(0);
		const response = await callWorker();
		expect(await response.text()).toBe(sorries[0]);
	});

	it("returns the last entry when Math.random is just below 1", async () => {
		vi.spyOn(Math, "random").mockReturnValue(0.9999999999);
		const response = await callWorker();
		expect(await response.text()).toBe(sorries[sorries.length - 1]);
	});

	it("returns the entry at floor(random * length)", async () => {
		vi.spyOn(Math, "random").mockReturnValue(0.5);
		const response = await callWorker();
		const expected = sorries[Math.floor(0.5 * sorries.length)];
		expect(await response.text()).toBe(expected);
	});

	it("can reach every entry", async () => {
		const reached = new Set<string>();
		for (let i = 0; i < sorries.length; i++) {
			const spy = vi
				.spyOn(Math, "random")
				.mockReturnValue((i + 0.5) / sorries.length);
			const response = await callWorker();
			reached.add(await response.text());
			spy.mockRestore();
		}
		expect(reached.size).toBe(sorries.length);
	});

	it("calls Math.random once per request", async () => {
		const spy = vi.spyOn(Math, "random").mockReturnValue(0);
		await callWorker();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it("returns different entries for different random values", async () => {
		const spy = vi
			.spyOn(Math, "random")
			.mockReturnValueOnce(0.1)
			.mockReturnValueOnce(0.9);
		const first = await (await callWorker()).text();
		const second = await (await callWorker()).text();
		expect(spy).toHaveBeenCalledTimes(2);
		expect(first).not.toBe(second);
	});
});

describe("Sorry worker response contract", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("responds with status 200", async () => {
		const response = await callWorker();
		expect(response.status).toBe(200);
	});

	it("body is one entry with no surrounding whitespace or newline", async () => {
		const body = await (await callWorker()).text();
		expect(body).toBe(body.trim());
		expect(body).not.toContain("\n");
		expect(sorries).toContain(body);
	});

	it("body is non-empty", async () => {
		const body = await (await callWorker()).text();
		expect(body.length).toBeGreaterThan(0);
	});
});
