import { describe, it, expect } from "vitest";
import { mapUserToContact, mapRandomUserToContact } from "../features/contacts/model/contactMapper.js";

const sampleRandomUser = {
  name: { title: "Miss", first: "Jennie", last: "Nichols" },
  email: "jennie.nichols@example.com",
  phone: "(272) 790-0888",
  location: { city: "Billings" },
  login: { uuid: "7a0eed16-9430-4d68-901f-c0d4c1c3bf00" },
  registered: { date: "2007-07-09T05:51:59.390Z" },
  picture: { medium: "https://randomuser.me/api/portraits/med/women/75.jpg" },
};

describe("mapRandomUserToContact", () => {
  it("maps name fields correctly", () => {
    const contact = mapRandomUserToContact(sampleRandomUser);
    expect(contact.firstName).toBe("Jennie");
    expect(contact.lastName).toBe("Nichols");
  });

  it("uses login.uuid as id", () => {
    const contact = mapRandomUserToContact(sampleRandomUser);
    expect(contact.id).toBe("7a0eed16-9430-4d68-901f-c0d4c1c3bf00");
  });

  it("maps email, phone, city", () => {
    const contact = mapRandomUserToContact(sampleRandomUser);
    expect(contact.email).toBe("jennie.nichols@example.com");
    expect(contact.phone).toBe("(272) 790-0888");
    expect(contact.city).toBe("Billings");
  });

  it("maps picture url", () => {
    const contact = mapRandomUserToContact(sampleRandomUser);
    expect(contact.picture).toBe("https://randomuser.me/api/portraits/med/women/75.jpg");
  });

  it("uses registered.date as updatedAt", () => {
    const contact = mapRandomUserToContact(sampleRandomUser);
    expect(contact.updatedAt).toBe("2007-07-09T05:51:59.390Z");
  });

  it("defaults company to empty string", () => {
    const contact = mapRandomUserToContact(sampleRandomUser);
    expect(contact.company).toBe("");
  });
});

describe("mapUserToContact (JSONPlaceholder fallback)", () => {
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
