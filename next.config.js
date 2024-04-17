/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXTAUTH_URL:"http://localhost:3000",
        NEXTAUTH_SECRET:"abc"
    }
}

module.exports = nextConfig
