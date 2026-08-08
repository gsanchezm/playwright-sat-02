import { test, expect } from "@playwright/test";
import { AuthService } from "../../services";
import { Hooks } from "../../helpers/hooks";
import usersJson from "../../data/users.json" with {type: "json"};
import type {User} from "../../types"

const users = usersJson as User[];
const standardUser = users.find((u) => u.username === "standard_user")!;
const API_URL = process.env.API_URL ?? "https://omnipizza-backend.onrender.com";

test.describe("Auth services tests", () => {
    const hooks = new Hooks(API_URL);

    test.beforeAll(async () => {
        await hooks.beforeAll();
    });

    test.afterAll(async () =>{
        await hooks.afterAll();
    })

    test("successful login returns token", async() => {
        const res = await hooks.auth.login(standardUser);

        console.log("Login resp = ", res)
        expect(res.access_token).toBeTruthy();
        expect(typeof res.access_token).toBe("string")

    })

    

})