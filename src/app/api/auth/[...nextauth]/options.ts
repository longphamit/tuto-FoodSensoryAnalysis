import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import LoginService from "@/app/service/LoginService";

export const options: NextAuthOptions = {
    session:{
        strategy:"jwt"
    },
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                const user = await LoginService(credentials?.username,credentials?.password);
                console.log(user)
                return user;
            }
        })
    ],

}