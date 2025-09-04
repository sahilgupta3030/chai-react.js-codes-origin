import config from "../config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                // TODO: call another method...
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Account creation failed:", error.message);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password });

        } catch (error) {
            console.error("Login failed:", error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Get Current User failed:", error.message);
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Logout failed:", error.message);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
