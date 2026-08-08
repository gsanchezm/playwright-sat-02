import { test, expect } from "@playwright/test";
import { AuthService } from "../services";

export class Hooks{
    private _auth!: AuthService;

    constructor(private readonly baseURL: string){

    }
    
    async beforeAll(): Promise<void>{
        this._auth = await AuthService.create(this.baseURL);
    }

    async afterAll(): Promise<void> {
        await this._auth.dispose();
    }

    get auth(): AuthService {
        return this._auth;
    }
}


