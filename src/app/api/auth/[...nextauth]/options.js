import CredentialsProvider from 'next-auth/providers/credentials'
import LoginService from "../../../service/LoginService";


export const options = {
    secret: "abc",
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/portal/signout"
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
        async jwt({token, user}) {
            // user is only available the first time a user signs in authorized
            if (user) {
                return {
                    ...token,
                    user:user,
                    accessToken: user.token,
                };
            }
            return token;
        },
        async session({session, token}) {
            session.accessToken = token.accessToken;
            session.user=token.user
            return session;
        },

    }

}