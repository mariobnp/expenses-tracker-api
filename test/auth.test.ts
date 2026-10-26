import request from "supertest";
import { app } from "../src/app.js";
import { deleteUser } from "./test.util.js";
import { prisma } from "../src/lib/prisma.js";

describe("POST /api/v1/auth/register", () => {
  const username = "test";
  afterEach(async () => {
    await deleteUser(username);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("it should register new user without password in response", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      username,
      name: "Test",
      password: "PasswordKuat123!",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe(username);
    expect(response.body.data.name).toBe("Test");
    expect(response.body.data).not.toHaveProperty("password");
  });

  it("should reject register new user if request is invalid", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      username: "",
      name: "",
      password: "",
    });

    expect(response.status).toBe(422);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");

    const invalidFields = response.body.error.details.map(
      (detail: { field: string }) => detail.field,
    );

    expect(invalidFields).toEqual(
      expect.arrayContaining(["username", "name", "password"]),
    );
  });

  it("should reject register new user if username already exist", async () => {
    const payload = {
      username: "test",
      name: "Test",
      password: "PasswordKuat123!",
    };

    const firstResponse = await request(app)
      .post("/api/v1/auth/register")
      .send(payload);

    expect(firstResponse.status).toBe(201);

    const duplicateResponse = await request(app)
      .post("/api/v1/auth/register")
      .send(payload);

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.error.code).toBe("CONFLICT_ERROR");
    expect(duplicateResponse.body.error.message).toBe("Username already exist");
  });
});
