import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const UserAccount = await this.account.create(
                ID.unique,
                email,
                password,
                name
            );
            if (UserAccount) {
                return this.login({ email, password });
            } else {
                return UserAccount;
            }
        } catch (error) {
            console.log("Authservice: CreateAccount: ", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("AuthService: Login: ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Error in current Session ::`, error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error in logout", error);
        }
    }
}

const authService = new AuthService();
export default authService;