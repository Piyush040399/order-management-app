import request from "supertest";
import app from "../app.js";

jest.setTimeout(20000);

describe("Menu API", () => {
  test("GET /api/menu should return menu items", async () => {
    const response = await request(app).get("/api/menu");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
