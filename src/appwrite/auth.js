import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Ensure this is correct
            .setProject(conf.appwriteProjectId); // Ensure this is correct
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthService: CreateAccount:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("AuthService: Login:", error);
            throw error;
        }
    }
    async googlelogin() {
        try {
            return await this.account.createOAuth2Session(
                "google",
                'https://mega-blog-woad.vercel.app/all-posts',
                'hhttps://mega-blog-woad.vercel.app/login'
            )
        } catch (err) {
            console.log("error in google login", err)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error in current session:", error);
            throw error;
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error in logout:", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;