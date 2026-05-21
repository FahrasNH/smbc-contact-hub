import { describe, it, expect, beforeEach } from "vitest";
import { readMutations, writeMutations, clearMutations } from "../shared/lib/storage.js";

describe("storage", () => {
  beforeEach(() => {
    clearMutations();
  });

  it("returns empty mutations by default", () => {
    expect(readMutations()).toEqual({ created: [], updated: {}, deletedIds: [] });
  });

  it("persists mutations", () => {
    const data = { created: [{ id: 99 }], updated: {}, deletedIds: [1] };
    writeMutations(data);
    expect(readMutations().created[0].id).toBe(99);
    expect(readMutations().deletedIds).toContain(1);
  });
});
