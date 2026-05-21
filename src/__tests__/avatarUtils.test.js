import { describe, it, expect } from "vitest";
import { initialsFromName, avatarBackgroundStyle } from "../shared/lib/avatarUtils.js";

describe("avatarUtils", () => {
  it("initialsFromName returns two letters", () => {
    expect(initialsFromName("Leanne", "Graham")).toBe("LG");
  });

  it("avatarBackgroundStyle returns gradient", () => {
    expect(avatarBackgroundStyle(1).background).toContain("linear-gradient");
  });
});
