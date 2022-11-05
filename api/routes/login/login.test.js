import request from "supertest";
import app from "../../../app";

describe("POST /login", () => {
    test("Return 400 status & json error if email is not provided", async () => {
        const res = await request(app).post("/api/v1/login").send({});
        expect(res.statusCode).toBe(400);
        expect(res.headers["content-type"]).toContain("json");
        expect(res.body).toEqual({
            ok: false,
            filed: "email",
            message: '"Email" is required',
        });
    });
    test("Return 400 status & json error if email is not provided", async () => {
        const res = await request(app)
            .post("/api/v1/login")
            .send({ email: "" });
        expect(res.statusCode).toBe(400);
        expect(res.headers["content-type"]).toContain("json");
        expect(res.body).toEqual({
            ok: false,
            filed: "email",
            message: '"Email" is not allowed to be empty',
        });
    });
    test("Return 400 status & json error if email not valid", async () => {
        const res = await request(app).post("/api/v1/login").send({
            email: "someemail@.com",
        });
        expect(res.statusCode).toBe(400);
        expect(res.headers["content-type"]).toContain("json");
        expect(res.body).toEqual({
            ok: false,
            filed: "email",
            message: '"Email" must be a valid email',
        });
    });
    test("Return 400 status & json error if password is empty", async () => {
        const res = await request(app).post("/api/v1/login").send({
            email: "mail@gmail.com",
            password: "",
        });
        expect(res.statusCode).toBe(400);
        expect(res.headers["content-type"]).toContain("json");
        expect(res.body).toEqual({
            ok: false,
            filed: "password",
            message: '"Password" is not allowed to be empty',
        });
    });
    test("Return 400 status & json error if password is not provided", async () => {
        const res = await request(app).post("/api/v1/login").send({
            email: "mail@gmail.com",
        });
        expect(res.statusCode).toBe(400);
        expect(res.headers["content-type"]).toContain("json");
        expect(res.body).toEqual({
            ok: false,
            filed: "password",
            message: '"Password" is required',
        });
    });
});
