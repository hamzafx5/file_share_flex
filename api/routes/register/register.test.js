import request from "supertest";
import app from "../../../app.js";
import randomHexString from "../../../helpers/randomHexString.js";

describe("POST /users", () => {
    describe("Validate the user inputs", () => {
        test("if no fields are provided return a status of 400 & json error", async () => {
            const res = await request(app).post("/api/v1/register").send();
            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "fullName",
                message: '"Full Name" is required',
            });
        });
        test("Return 400 status and json error if name is less more 30 letters", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza bouchgara amri files nalme",
            });

            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "fullName",
                message:
                    '"Full Name" length must be less than or equal to 30 characters long',
            });
        });
        test("Return 400 status and json error if name is less than 3 letters", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Ha",
            });

            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "fullName",
                message:
                    '"Full Name" length must be at least 3 characters long',
            });
        });
        // validate the email filed
        test("Return 400 status & json error if email not provided", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza",
            });

            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "email",
                message: '"Email" is required',
            });
        });
        test("Return 400 status & json error if email is empty", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza",
                email: "",
            });

            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "email",
                message: '"Email" is not allowed to be empty',
            });
        });
        test("Return 400 status & json error if email is not valid", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza",
                filed: "email",
                email: "hamza@.net",
            });

            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "email",
                message: '"Email" must be a valid email',
            });
        });
        test("Return 400 status & json error if email is already been used", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza Amri",
                email: "bouchgarahamza@gmail.com",
                password: "ABCDEà_8HOI",
            });
            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "email",
                message: "This Email is already been used",
            });
        });
        // Validate the password filed
        test("Return 400 status & json error if password not defined", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza Amri",
                email: "test@gmail.com",
            });
            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "password",
                message: '"Password" is required',
            });
        });
        test("Return 400 status & json error if password is empty", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza Amri",
                email: "test@gmail.com",
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
        test("Return 400 status & json error if password less than 6 character", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza Amri",
                email: "test@gmail.com",
                password: "ABC",
            });
            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "password",
                message: '"Password" length must be at least 6 characters long',
            });
        });
        test("Return 400 status & json error if password more than 20 character", async () => {
            const res = await request(app).post("/api/v1/register").send({
                fullName: "Hamza Amri",
                email: "test@gmail.com",
                password: "some long password for testing",
            });
            expect(res.statusCode).toBe(400);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: false,
                filed: "password",
                message:
                    '"Password" length must be less than or equal to 20 characters long',
            });
        });
        // Success
        test("Return 201 status and json success response if the account is created", async () => {
            const res = await request(app)
                .post("/api/v1/register")
                .send({
                    fullName: "test Name",
                    email: "testmail" + Date.now() + "@gmail.com",
                    password: randomHexString(10),
                });
            expect(res.statusCode).toBe(201);
            expect(res.headers["content-type"]).toContain("json");
            expect(res.body).toEqual({
                ok: true,
                message: "The Account was created successfully",
            });
        });
    });
});
