/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXTAUTH_URL:"http://localhost:3002",
        NEXTAUTH_SECRET:"abc"
    },
    reactStrictMode:"false",
    output: "standalone",
}

module.exports = nextConfig
