import { describe, it, expect } from "vitest";
import { sorries } from "../src/index";

describe("sorries data", () => {
	it("is a non-empty array", () => {
		expect(Array.isArray(sorries)).toBe(true);
		expect(sorries.length).toBeGreaterThan(0);
	});

	it("contains only non-empty strings", () => {
		for (const entry of sorries) {
			expect(typeof entry).toBe("string");
			expect(entry.trim().length).toBeGreaterThan(0);
		}
	});

	it("has no leading or trailing whitespace", () => {
		for (const entry of sorries) {
			expect(entry).toBe(entry.trim());
		}
	});

	it("has no line breaks or control characters", () => {
		for (const entry of sorries) {
			expect(entry).not.toMatch(/[\u0000-\u001f\u007f]/);
		}
	});

	it("has no duplicate entries", () => {
		const seen = new Set<string>();
		const duplicates: string[] = [];
		for (const entry of sorries) {
			if (seen.has(entry)) duplicates.push(entry);
			seen.add(entry);
		}
		expect(duplicates).toEqual([]);
	});

	it("keeps every entry at 40 characters or fewer", () => {
		const tooLong = sorries.filter((entry) => entry.length > 40);
		expect(tooLong).toEqual([]);
	});
});
