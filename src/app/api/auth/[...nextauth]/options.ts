import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import LoginService from "@/app/service/LoginService";

export const options: NextAuthOptions = {
    secret: "abc",
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        signOut:"/portal/signout"
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
                try {
                    return await LoginService(credentials?.username, credentials?.password);
                } catch (e) {
                    throw e;
                }

            }
        })
    ],
    callbacks: {
        async jwt({token,user}) {
            return {...token,...user}
        },
        async session({session, token, user}) {
            session.user=token;
            return session;
        }
    }

}