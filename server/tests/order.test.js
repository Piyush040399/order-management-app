import request from "supertest";
import app from "../app.js";
import Menu from "../models/Menu.js";

jest.setTimeout(20000);

describe("Order API", () => {
  test("POST /api/orders should create order", async () => {
    const menu = await Menu.findOne();

    const response = await request(app)
      .post("/api/orders")
      .send({
        customerName: "Piyush",
        address: "Bhopal",
        phone: "9876543210",
        items: [
          {
            menuId: menu._id,
            quantity: 2,
          },
        ],
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.customerName).toBe("Piyush");
  });

  test("GET /api/orders should return orders", async () => {
    const response = await request(app).get("/api/orders");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  });
});
