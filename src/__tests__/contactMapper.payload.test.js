import { describe, it, expect } from "vitest";
import { mapContactToUserPayload } from "../features/contacts/model/contactMapper.js";

describe("mapContactToUserPayload", () => {
  it("builds user payload from contact", () => {
    const payload = mapContactToUserPayload({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@test.com",
      phone: "555",
      company: "Acme",
      city: "NYC",
    });
    expect(payload.name).toBe("Jane Doe");
    expect(payload.email).toBe("jane@test.com");
    expect(payload.address.city).toBe("NYC");
    expect(payload.company.name).toBe("Acme");
  });
});
