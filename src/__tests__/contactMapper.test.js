import { describe, it, expect } from "vitest";
import { mapUserToContact } from "../features/contacts/model/contactMapper.js";

describe("mapUserToContact", () => {
  it("splits full name into first and last", () => {
    const contact = mapUserToContact({
      id: 1,
      name: "Leanne Graham",
      email: "a@b.com",
      phone: "123",
      company: { name: "Acme" },
      address: { city: "Gwenborough" },
    });
    expect(contact.firstName).toBe("Leanne");
    expect(contact.lastName).toBe("Graham");
    expect(contact.company).toBe("Acme");
    expect(contact.city).toBe("Gwenborough");
    expect(contact.updatedAt).toBeTruthy();
  });

  it("handles single word name", () => {
    const contact = mapUserToContact({
      id: 2,
      name: "Madonna",
      email: "m@x.com",
      phone: "1",
      company: { name: "" },
      address: { city: "" },
    });
    expect(contact.firstName).toBe("Madonna");
    expect(contact.lastName).toBe("");
  });
});
