import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const UserAccount = this.account.create(ID.unique, email, password, name)
            if (UserAccount) {
                return this.login({ email, password })
            } else {
                return UserAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async currentSession() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log(`Error in current Session ::`, error)
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Error in log out", error)
        }
    }

}

const authService = new AuthService();
export default authService;