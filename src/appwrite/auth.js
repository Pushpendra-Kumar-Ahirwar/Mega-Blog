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

    async verification(userId, secret) {
        try {
            await this.account.updateVerification(userId, secret);
            return true;
        } catch (error) {
            console.error("Error verifying email:", error);
            return false;
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
            return this.account.createOAuth2Session(
                "google",
                'https://mega-blog-woad.vercel.app/all-posts',
                'https://mega-blog-woad.vercel.app/login'
                // "google",
                // 'http://localhost:5173/all-posts',
                // 'http://localhost:5173/login'
            )
        } catch (err) {
            console.log("error in google login", err)
        }
    }
    async githublogin() {
        try {
            return this.account.createOAuth2Session(
                "github",
                'https://mega-blog-woad.vercel.app/all-posts',
                'https://mega-blog-woad.vercel.app/login'
                // "github",
                // 'http://localhost:5173/all-posts',
                // 'http://localhost:5173/login'
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
    async getAllUser() {
        try {
            return await this.account.listIdentities();
        } catch (error) {
            console.error("Error ALl user fetching session:", error);
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